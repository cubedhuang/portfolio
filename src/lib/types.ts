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
