<script lang="ts">
	import Meta from '#lib/components/Meta.svelte';
	import Project from './Project.svelte';

	import nimi from '#lib/assets/images/projects/nimi.png?enhanced';
	import boids from '#lib/assets/images/projects/boids.png?enhanced';
	import pseudocode from '#lib/assets/images/projects/pseudocode.png?enhanced';
	import debating from '#lib/assets/images/projects/debating.png?enhanced';
	import embed from '#lib/assets/images/projects/embed.png?enhanced';
	import battleship from '#lib/assets/images/projects/battleship.png?enhanced';
	import wordle from '#lib/assets/images/projects/wordle.png?enhanced';
	import cubedhuang from '#lib/assets/images/projects/cubedhuang.jpg?enhanced';
</script>

<Meta title="Projects – Daniel" description="My projects." />

<main class="wrapper fade">
	<h1 class="header">Projects</h1>

	<p class="mt-4 mb-6 text-muted">
		Personal projects I've built and maintain.
	</p>

	<Project name="nimi.li" href="https://nimi.li" src={nimi} loading="eager">
		Interactive dictionary for Toki Pona featuring word usage and frequency
		data from the community.
	</Project>

	<Project name="Boids" href="https://boids.dan.onl" src={boids}>
		An interactive web-based simulation of flocking behavior with adjustable
		parameters.
	</Project>

	<Project
		name="Pseudocode Interpreter"
		href="https://board.dan.onl"
		src={pseudocode}
	>
		An interpreter for the specified pseudocode language in AP Computer
		Science Principles.
	</Project>

	<Project name="debating.live" href="https://debating.live" src={debating}>
		Real-time platform for timer sharing, speech tracking, and more for
		timed debate formats.
	</Project>

	<Project
		name="Discord Code Generator"
		href="https://embed.dan.onl"
		src={embed}
	>
		An tool allowing bot developers to interactively generate code embeds in
		various languages.
	</Project>

	<Project
		name="Battleship"
		href="https://battleship.dan.onl"
		src={battleship}
	>
		A simple Battleship interface with computer adversaries to play online.
	</Project>

	<Project name="Guess the Word" href="https://word.dan.onl" src={wordle}>
		A simple bot that uses images to accurately simulate the popular game
		Wordle in Discord.
	</Project>

	<Project name="CubeDHuang" href="https://cubedhuang.com" src={cubedhuang}>
		A collection of smaller experiments and projects I've worked on over the
		years.
	</Project>
</main>
