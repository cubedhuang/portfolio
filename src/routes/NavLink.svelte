<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { Path } from '$app/types';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { href, children }: { href: Path; children: Snippet } = $props();

	let active = $derived();
</script>
