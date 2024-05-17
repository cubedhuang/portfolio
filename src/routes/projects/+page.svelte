<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Project from './Project.svelte';
</script>

<Meta title="Projects – Daniel" description="My projects." />

<main class="wrapper fade">
	<h1 class="header">Projects</h1>

	<p class="mt-4 mb-8 text-gray-400">Some of my projects.</p>

	<Project
		name="nimi.li"
		href="https://nimi.li"
		src="/images/projects/nimi.png"
	>
		Interactive dictionary for Toki Pona featuring word usage and frequency
		data from the community.
	</Project>

	<Project
		name="debating.live"
		href="https://debating.live"
		src="/images/projects/debating.png"
	>
		Real-time platform for timer sharing, speech tracking, and more for
		timed debate formats.
	</Project>

	<Project
		name="Pseudocode Interpreter"
		href="https://board.dan.onl"
		src="/images/projects/pseudocode.png"
	>
		An interpreter for the specified pseudocode language in AP Computer
		Science Principles.
	</Project>

	<Project
		name="Boids"
		href="https://boids.cubedhuang.com"
		src="/images/projects/boids.png"
	>
		An interactive web-based simulation of flocking behavior with adjustable
		parameters.
	</Project>

	<Project
		name="Discord Code Generator"
		href="https://embed.dan.onl"
		src="/images/projects/embed.png"
	>
		An tool allowing bot developers to interactively generate code embeds in
		various languages.
	</Project>

	<Project
		name="Guess the Word"
		href="https://word.dan.onl"
		src="/images/projects/wordle.png"
	>
		A simple bot that uses images to accurately simulate the popular game
		Wordle in Discord.
	</Project>

	<Project
		name="CubeDHuang"
		href="https://cubedhuang.com"
		src="/images/projects/cubedhuang.jpg"
	>
		A collection of many small experiments and projects I've worked on over
		the years.
	</Project>
</main>
