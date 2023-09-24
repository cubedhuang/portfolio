<script lang="ts">
	import { browser } from '$app/environment';
	import Meta from '$lib/components/Meta.svelte';

	import type { TopTracksResponse } from '$lib/types';

	const options = [
		{ name: 'Past Month', value: 'short_term' },
		{ name: 'Past 6 Months', value: 'medium_term' },
		{ name: 'All Time', value: 'long_term' }
	];

	const tracks = {
		short_term: null as TopTracksResponse | null,
		medium_term: null as TopTracksResponse | null,
		long_term: null as TopTracksResponse | null
	};

	let selectedRange = options[0].value;

	$: if (browser) {
		fetchTopTracks(selectedRange as 'short_term');
	}

	function fetchTopTracks(range: 'short_term' | 'medium_term' | 'long_term') {
		if (tracks[range]) return;

		tracks[range] = [];

		fetch('/api/top-tracks?time_range=' + range)
			.then(res => res.json())
			.then(res => {
				tracks[range] = res;
			});
	}

	$: currentRange =
		tracks[selectedRange as 'short_term' | 'medium_term' | 'long_term'];
</script>

<Meta
	title="Music – Daniel"
	description="My most listened tracks on Spotify."
/>

<main class="fade">
	<div class="wrapper fade">
		<h1 class="text-6xl font-black">Music</h1>

		<p class="mt-4 text-gray-400">My most listened tracks on Spotify.</p>

		<div class="mt-8 flex flex-wrap gap-x-8 text-gray-400">
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
			class="fade mt-8 mx-auto max-w-screen-xl px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 grid-flow-dense"
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
								group-hocus-visible:brightness-50 group-hocus-visible:scale-[1.02]"
						aria-label="Album Art"
					/>

					<div
						class="z-20 absolute inset-4 flex flex-col justify-end transition duration-300
								scale-95 opacity-0 group-hocus-visible:scale-100 group-hocus-visible:opacity-100
								{big ? 'sm:scale-[0.975]' : ''}"
					>
						<p
							class="font-bold text-xl overflow-ellipsis leading-tight mb-1"
						>
							{track.name}
						</p>

						{#each track.artists as artist}
							<p class="text-sm text-gray-200 leading-tight">
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
