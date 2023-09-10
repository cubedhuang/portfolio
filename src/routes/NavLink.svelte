<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	$: active = href === $page.url.pathname;
</script>

<li>
	<a {href} class="transition {active ? 'text-white' : ''}">
		<slot />
	</a>
</li>
