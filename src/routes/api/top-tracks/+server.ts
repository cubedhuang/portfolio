import { SPOTIFY_CLIENT_ID } from '$app/env/private';
import { getSpotifyAccessToken } from '#lib/server/spotify.ts';
import type { SpotifyTimeRange } from '#lib/types.ts';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { error, json } from '@sveltejs/kit';

export async function GET({ fetch, platform, setHeaders, url }) {
	const range = url.searchParams.get('time_range') ?? '';

	if (!['short_term', 'medium_term', 'long_term'].includes(range)) {
		throw error(400, 'Invalid time_range');
	}

	const accessToken = await getSpotifyAccessToken({ fetch, platform });

	const api = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, accessToken, {
		fetch
	});

	const items = await api.currentUser.topItems(
		'tracks',
		range as SpotifyTimeRange,
		50
	);

	setHeaders({
		'Cache-Control': 'public, max-age=0, s-maxage=300'
	});

	return json(items.items);
}
