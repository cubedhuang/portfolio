import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { NowPlayingResponse } from '$lib/types';

type AccessTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
};

// this is available in cloudflare
declare const btoa: (input: string) => string;

function makeKV(platform: Readonly<App.Platform> | undefined) {
	if (!platform?.env?.SPOTIFY_KV) {
		let kv: Record<string, string | undefined> = {};

		return {
			async get(key: string) {
				return kv[key];
			},
			async put(key: string, value: string) {
				kv[key] = value;
			}
		};
	}

	return platform.env?.SPOTIFY_KV;
}

export async function GET({ fetch, platform }) {
	const kv = makeKV(platform);

	let accessTokenRaw = await kv.get('accessToken');
	let accessToken: AccessToken;

	const expirationTime = Number(await kv.get('expirationTime')) || 0;

	if (!accessTokenRaw || Date.now() > expirationTime) {
		const response: AccessTokenResponse = await fetch(
			'https://accounts.spotify.com/api/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${btoa(
						`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
					)}`
				},
				body: new URLSearchParams({
					grant_type: 'refresh_token',
					refresh_token: env.SPOTIFY_REFRESH_TOKEN
				})
			}
		).then(res => res.json());

		await kv.put('accessToken', JSON.stringify(response));
		await kv.put(
			'expirationTime',
			`${Date.now() + response.expires_in * 1000}`
		);

		accessToken = {
			...response,
			refresh_token: env.SPOTIFY_REFRESH_TOKEN
		};
	} else {
		accessToken = JSON.parse(accessTokenRaw);

		accessToken.expires_in = (expirationTime - Date.now()) / 1000;
		accessToken.refresh_token = env.SPOTIFY_REFRESH_TOKEN;
	}

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

	return json(response);
}
