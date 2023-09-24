import type { Track } from '@spotify/web-api-ts-sdk';

export type NowPlayingResponse = {
	/**
	 * Whether the track is from recently played or currently playing.
	 */
	isPlayingNow: boolean;
	isPaused: boolean;
	progessMs: number;
	track: Track | null;
};

export type TopTracksResponse = Track[];

export type SpotifyTimeRange = 'short_term' | 'medium_term' | 'long_term';

export type WeatherResponse = {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	clouds: {
		all: number;
	};
	rain: {
		'1h': number;
		'3h': number;
	};
	snow: {
		'1h': number;
		'3h': number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
};
