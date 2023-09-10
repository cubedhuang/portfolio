<script lang="ts">
	import { now } from '$lib/stores';

	import Sun from '$lib/components/icons/Sun.svelte';
	import Moon from '$lib/components/icons/Moon.svelte';

	const df = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'long',
		timeZone: 'America/New_York'
	});

	const tf = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: 'America/New_York',
		timeZoneName: 'short'
	});

	$: isDay = $now.getUTCHours() - 4 >= 6 && $now.getUTCHours() - 4 < 18;
</script>

<p class="mt-8 flex text-sm gap-2 items-center text-white">
	{#if isDay}
		<Sun />
	{:else}
		<Moon />
	{/if}

	{df.format($now)}
	&middot;
	{tf.format($now)}
</p>
