import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { NowPlayingResponse } from '$lib/types';
import Spotify from 'spotify-web-api-node';

const api = new Spotify({
	clientId: env.SPOTIFY_CLIENT_ID,
	clientSecret: env.SPOTIFY_CLIENT_SECRET,
	refreshToken: env.SPOTIFY_REFRESH_TOKEN
});
let expirationTime = 0;

export async function GET() {
	try {
		if (Date.now() > expirationTime) {
			const response = await api.refreshAccessToken();
			api.setAccessToken(response.body.access_token);

			expirationTime = Date.now() + response.body.expires_in * 1000;
		}

		const response: NowPlayingResponse = {
			isPlayingNow: false,
			isPaused: false,
			progessMs: 0,
			track: null
		};
		const playing = await api.getMyCurrentPlayingTrack();

		if (playing.body?.item && 'album' in playing.body.item) {
			response.isPlayingNow = true;
			response.track = playing.body.item;
			response.isPaused = !playing.body.is_playing;
			response.progessMs = playing.body.progress_ms ?? 0;
		} else {
			const lastPlayed = await api.getMyRecentlyPlayedTracks({
				limit: 1
			});

			if (lastPlayed.body?.items[0]?.track) {
				response.track = lastPlayed.body.items[0]
					.track as SpotifyApi.TrackObjectFull;
			}
		}

		return json(response);
	} catch (err) {
		console.error(err);

		throw error(
			500,
			`${
				!err
					? 'Unknown error'
					: typeof err !== 'object'
					? err
					: 'message' in err
					? err.message
					: err
			}`
		);
	}
}
