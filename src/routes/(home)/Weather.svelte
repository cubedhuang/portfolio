<script lang="ts">
	import { onMount } from 'svelte';
	import type { WeatherResponse } from '$lib/types';

	import Cloud from '$lib/components/icons/Cloud.svelte';

	let data: WeatherResponse | undefined;

	onMount(() => {
		fetch('/api/weather')
			.then(res => res.json())
			.then(res => {
				data = res;
			});
	});

	const names: Record<string, string> = {
		'clear sky': 'clear skies',
		'few clouds': 'a few clouds',
		'scattered clouds': 'scattered clouds',
		'broken clouds': 'broken clouds',
		'shower rain': 'rain showers',
		rain: 'rain',
		thunderstorm: 'thunderstorms',
		snow: 'snow',
		mist: 'mist'
	};
</script>

<p class="mt-2 flex text-sm gap-2 items-center text-white">
	<Cloud />

	<span>
		{#if data}
			It's
			<b>{data.main.temp.toFixed(0)} °F</b> with
			{names[data.weather[0].description] ?? data.weather[0].description}
			in
			<b>{data.name}</b>.
		{:else}
			In <b>Marietta</b>
		{/if}
	</span>
</p>

<style lang="postcss">
	b {
		@apply font-semibold;
	}
</style>
