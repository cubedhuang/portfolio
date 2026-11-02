<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';

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

	const mousePosition = new Spring(
		{ x: 0, y: 0 },
		{ stiffness: 0.05, damping: 0.3 }
	);
	const mouseStrength = new Spring(0);
	const mousePressed = new Spring(0);

	let mouseActivity = 0;

	function mouseMove(x: number, y: number) {
		mousePosition.set({ x, y }, { instant: mouseStrength.current < 0.01 });
		mouseActivity = 1;
	}

	function mouseUp() {
		mousePressed.target = 0;
	}

	function mouseLeave() {
		mouseUp();
		mouseActivity = 0;
	}

	function update(dt: number) {
		if (mousePressed.target === 1) {
			mouseActivity = 1;
		} else {
			mouseActivity *= 0.9 ** (dt / (1000 / 60));
		}

		mouseStrength.target = mouseActivity < 0.01 ? 0 : mouseActivity;
	}

	let animationFrameRequest: number;
	let lastTime: number | undefined;

	function loop(time: number) {
		const dt = Math.min(time - (lastTime ?? time), 100);
		update(dt);
		lastTime = time;

		animationFrameRequest = requestAnimationFrame(loop);
	}

	onMount(() => {
		animationFrameRequest = requestAnimationFrame(loop);

		return () => cancelAnimationFrame(animationFrameRequest);
	});
</script>

<svelte:window
	onmousemove={e => mouseMove(e.clientX, e.clientY)}
	ontouchmove={e => mouseMove(e.touches[0].clientX, e.touches[0].clientY)}
	onmousedown={() => {
		mousePressed.target = 1;
	}}
	ontouchstart={e => {
		mouseMove(e.touches[0].clientX, e.touches[0].clientY);
		mousePressed.target = 1;
	}}
	onmouseup={mouseUp}
	ontouchend={e => {
		if (e.touches.length === 0) mouseUp();
	}}
	ontouchcancel={mouseLeave}
	onblur={mouseLeave}
/>

<svelte:document onmouseleave={mouseLeave} />

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

		<radialGradient id="mouseGradient">
			<stop
				offset="0%"
				stop-color="oklch(0.5 0.25 290 / {mouseStrength.current *
					(mousePressed.current * 0.125 + 0.125)})"
			/>
			<stop offset="100%" stop-color="oklch(0.5 0.25 290 / 0)" />
		</radialGradient>
	</defs>

	{#each boids as boid, i (i)}
		<circle
			cx="{boid.x}%"
			cy="{boid.y}%"
			r="{boid.r}%"
			fill="url(#boidGradient{i})"
		/>
	{/each}

	<circle
		cx={mousePosition.current.x}
		cy={mousePosition.current.y}
		r={mouseStrength.current * 100}
		fill="url(#mouseGradient)"
	/>
</svg>

<style lang="postcss">
	svg {
		view-transition-name: background;
	}
</style>
