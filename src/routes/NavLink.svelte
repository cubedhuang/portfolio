<script lang="ts">
	import type { Snippet } from 'svelte';

	import { page } from '$app/state';

	let { href, children }: { href: string; children: Snippet } = $props();

	let active = $derived(href === page.url.pathname);
</script>

<li>
	<a {href} class="transition {active ? 'text-white' : ''}">
		{@render children()}
	</a>
</li>
