import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { NowPlayingResponse } from '$lib/types';
import Spotify from 'spotify-web-api-node';

export async function GET({ platform }) {
	const api = new Spotify({
		clientId: env.SPOTIFY_CLIENT_ID,
		clientSecret: env.SPOTIFY_CLIENT_SECRET,
		refreshToken: env.SPOTIFY_REFRESH_TOKEN
	});

	try {
		const accessToken = await platform?.env?.SPOTIFY_KV.get('accessToken');
		const expirationTime =
			Number(await platform?.env?.SPOTIFY_KV.get('expirationTime')) || 0;

		if (!accessToken || Date.now() > expirationTime) {
			const response = await api.refreshAccessToken();
			api.setAccessToken(response.body.access_token);

			await platform?.env?.SPOTIFY_KV.put(
				'expirationTime',
				`${Date.now() + response.body.expires_in * 1000}`
			);
		} else {
			api.setAccessToken(accessToken);
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
