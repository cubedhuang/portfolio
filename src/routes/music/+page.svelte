<script lang="ts">
	import { browser } from '$app/environment';
	import Meta from '$lib/components/Meta.svelte';

	import type { SpotifyTimeRange, TopTracksResponse } from '$lib/types';

	const options: {
		name: string;
		value: SpotifyTimeRange;
	}[] = [
		{ name: 'Past Month', value: 'short_term' },
		{ name: 'Past 6 Months', value: 'medium_term' },
		{ name: 'All Time', value: 'long_term' }
	];

	const tracks: Record<SpotifyTimeRange, TopTracksResponse | null> = {
		short_term: null,
		medium_term: null,
		long_term: null
	};

	let selectedRange = options[0].value;

	$: if (browser) {
		fetchTopTracks(selectedRange);
	}

	function fetchTopTracks(range: SpotifyTimeRange) {
		if (tracks[range]) return;

		tracks[range] = [];

		fetch('/api/top-tracks?time_range=' + range)
			.then(res => res.json())
			.then(res => {
				tracks[range] = res;
			});
	}

	$: currentRange = tracks[selectedRange];
</script>

<Meta
	title="Music – Daniel"
	description="Tracks I've listened to the most on Spotify."
/>

<main>
	<div class="wrapper fade">
		<h1 class="header">Music</h1>

		<p class="mt-4 text-gray-400">
			Tracks I've listened to the most on Spotify.
		</p>

		<div class="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-gray-400">
			{#each options as { name, value }}
				<label
					class="transition cursor-pointer
						{selectedRange === value ? 'text-white' : ''}"
				>
					<input
						type="radio"
						name="time_range"
						{value}
						bind:group={selectedRange}
						class="sr-only"
					/>
					{name}
				</label>
			{/each}
		</div>
	</div>

	{#key selectedRange}
		<div
			class="fade fade-delay mt-8 mx-auto max-w-screen-xl px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 grid-flow-dense"
		>
			{#each currentRange ?? [] as track, i}
				{@const big = i % 10 === 0}

				<a
					href={track.external_urls.spotify}
					target="_blank"
					rel="noopener noreferrer"
					class="aspect-square relative group transition rounded-xl overflow-hidden
						{big ? 'sm:col-span-2 sm:row-span-2' : ''}"
				>
					<object
						data={track.album.images[0].url}
						type="image/png"
						class="w-full h-full rounded-xl bg-gray-800 transition duration-300
								group-hv:brightness-50 group-hv:scale-[1.02]"
						aria-label="Album Art"
					/>

					<div
						class="z-20 absolute inset-4 flex flex-col justify-end transition duration-300
							scale-95 opacity-0 group-hv:scale-100 group-hv:opacity-100
							{big ? 'sm:scale-[0.975]' : ''}"
					>
						<p
							class="font-bold sm:text-xl line-clamp-3 !leading-tight mb-1"
						>
							{track.name}
						</p>

						{#each track.artists as artist}
							<p
								class="text-xs sm:text-sm text-gray-200 !leading-tight"
							>
								{artist.name}
							</p>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	{/key}
</main>

<style lang="postcss">
	label:has(:focus-visible) {
		outline: 2px solid white;
		outline-offset: 4px;
	}
</style>
