<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Project from './Project.svelte';
</script>

<Meta title="Projects – Daniel" description="My projects." />

<main class="wrapper fade">
	<h1 class="text-6xl font-black">Projects</h1>

	<p class="mt-4 text-gray-400">Some of my projects.</p>

	<Project name="nimi.li" src="/images/projects/nimi.png">
		Interactive dictionary for the construction Toki Pona featuring data
		about word usage in the community.
	</Project>

	<Project name="debating.live" src="/images/projects/debating.png">
		Real-time platform for timer sharing, speech tracking, and more for
		timed debate formats.
	</Project>
</main>
