<script lang="ts">
	import { onMount } from 'svelte';
	import type { NowPlayingResponse } from '../../routes/api/now-playing/+server';

	let data: NowPlayingResponse;

	onMount(async () => {
		const res = await fetch('/api/now-playing');
		data = await res.json();
	});
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
