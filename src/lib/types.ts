export type NowPlayingResponse = {
	/**
	 * Whether the track is from recently played or currently playing.
	 */
	isPlayingNow: boolean;
	isPaused: boolean;
	progessMs: number;
	track: SpotifyApi.TrackObjectFull | null;
};
