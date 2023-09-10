<script lang="ts">
	export let href: string;
	export let name: string;
</script>

<a
	{href}
	aria-label={name}
	target="_blank"
	rel="noopener noreferrer"
	class="transition hover:text-gray-400"
>
	<slot />
</a>
