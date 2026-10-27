import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SPOTIFY_CLIENT_ID: {},
	SPOTIFY_CLIENT_SECRET: {},
	SPOTIFY_REFRESH_TOKEN: {},
	WEATHER_API_KEY: {}
});
