<script lang="ts">
	// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
	function mulberry32(a: number) {
		return function () {
			let t = (a += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	const SEED = 2004;
	const COUNT = 20;

	const random = mulberry32(SEED);
	const boids = Array.from({ length: COUNT }, () => ({
		x: random() * 100,
		y: random() * 100,
		r: 25 + random() * 25,
		hue: 270 + random() * 60
	}));
</script>

<svg
	aria-hidden="true"
	class="w-screen h-lvh fixed -z-10 top-0 left-0 pointer-events-none"
>
	<defs>
		{#each boids as boid, i (i)}
			<radialGradient id="boidGradient{i}">
				<stop
					offset="0%"
					stop-color="oklch(0.5 0.25 {boid.hue} / 0.1)"
				/>
				<stop
					offset="100%"
					stop-color="oklch(0.5 0.25 {boid.hue} / 0)"
				/>
			</radialGradient>
		{/each}
	</defs>

	{#each boids as boid, i (i)}
		<circle
			cx="{boid.x}%"
			cy="{boid.y}%"
			r="{boid.r}%"
			fill="url(#boidGradient{i})"
		/>
	{/each}
</svg>

<style lang="postcss">
	svg {
		view-transition-name: background;
	}
</style>
