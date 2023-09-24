import type { AccessToken } from '@spotify/web-api-ts-sdk';
import { env } from '$env/dynamic/private';

type AccessTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
};

// this is available in cloudflare
declare const btoa: (input: string) => string;

const mockKV = (() => {
	const kv: Record<string, string | undefined> = {};

	return () => ({
		async get(key: string) {
			return kv[key];
		},
		async put(key: string, value: string) {
			kv[key] = value;
		}
	});
})();

function makeKV(platform: Readonly<App.Platform> | undefined) {
	if (!platform?.env?.SPOTIFY_KV) {
		return mockKV();
	}

	return platform.env?.SPOTIFY_KV;
}

export async function getSpotifyAccessToken({
	fetch,
	platform
}: {
	fetch: (
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	) => Promise<Response>;
	platform: Readonly<App.Platform> | undefined;
}) {
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

	return accessToken;
}
