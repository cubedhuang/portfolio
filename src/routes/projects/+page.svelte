<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
</script>

<Meta title="Projects – Daniel" description="My projects." />

<main class="wrapper fade">
	<h1 class="text-6xl font-black">Projects</h1>

	<p class="mt-4 text-gray-400">Some of my projects.</p>

	<div
		class="mt-8 -mx-8 group grid grid-cols-2 rounded-xl overflow-hidden background-image"
		style:--url="url(/images/projects/nimi.png)"
	>
		<div class="p-8 m-8 rounded-xl bg-gray-900">
			<h2 class="font-bold text-3xl">nimi.li</h2>

			<p class="mt-4 text-gray-400">
				Interactive dictionary for the construction Toki Pona featuring
				data about word usage in the community.
			</p>
		</div>
	</div>
</main>

<style lang="postcss">
	.background-image {
		background-image: linear-gradient(
				to bottom right,
				theme('colors.gray.950/0.5'),
				theme('colors.gray.950/0')
			),
			var(--url);
	}
</style>
