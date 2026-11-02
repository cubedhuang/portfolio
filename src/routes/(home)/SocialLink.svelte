<script lang="ts">
	export let href: string;
	export let name: string;
</script>

<a
	{href}
	aria-label={name}
	target="_blank"
	rel="external noopener noreferrer"
	class="transition hover:text-accent"
>
	<slot />
</a>
