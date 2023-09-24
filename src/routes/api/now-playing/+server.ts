import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { NowPlayingResponse } from '$lib/types';
import { getSpotifyAccessToken } from '$lib/server/spotify.js';

export async function GET({ fetch, platform, setHeaders }) {
	const accessToken = await getSpotifyAccessToken({ fetch, platform });

	const api = SpotifyApi.withAccessToken(env.SPOTIFY_CLIENT_ID, accessToken, {
		fetch
	});

	const response: NowPlayingResponse = {
		isPlayingNow: false,
		isPaused: false,
		progessMs: 0,
		track: null
	};
	const playing = await api.player.getCurrentlyPlayingTrack();

	if (playing?.item && 'album' in playing.item) {
		response.isPlayingNow = true;
		response.track = playing.item;
		response.isPaused = !playing.is_playing;
		response.progessMs = playing.progress_ms ?? 0;
	} else {
		const lastPlayed = await api.player.getRecentlyPlayedTracks(1);

		if (lastPlayed.items[0]?.track) {
			response.track = lastPlayed.items[0].track;
		}
	}

	setHeaders({
		'Cache-Control': 'public, max-age=0, s-maxage=3'
	});

	return json(response);
}
