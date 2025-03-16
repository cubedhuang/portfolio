<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let refDiv: HTMLDivElement;

	let width: number;
	let height: number;

	class Boid {
		#r: number;

		x: number;
		y: number;
		vx: number;
		vy: number;
		hue: number;

		constructor() {
			this.#r = Math.random() * 1 + 1;
			this.x = Math.random() * (width + 2 * this.r) - this.r;
			this.y = Math.random() * (height + 2 * this.r) - this.r;

			this.vx = 0;
			this.vy = 0;
			this.hue = Math.random() * 60 + 240;
		}

		get r() {
			return (this.#r * width * height * devicePixelRatio) / 8000;
		}
	}

	let boids: Boid[] = [];

	function resize() {
		const dw = window.innerWidth / width;
		const dh = refDiv.clientHeight / height;

		for (const boid of boids) {
			boid.x *= dw;
			boid.y *= dh;
		}

		width = window.innerWidth;
		height = refDiv.clientHeight;

		const amount = 20;

		if (boids.length < amount) {
			while (boids.length < amount) {
				boids.push(new Boid());
			}
		} else if (boids.length > amount) {
			while (boids.length > amount) {
				boids.pop();
			}
		}
	}

	const mousePosition = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.3
		}
	);
	const mouseStrength = spring(0);
	const mousePressed = spring(0);

	function update() {
		for (const boid of boids) {
			boid.x += boid.vx;
			boid.y += boid.vy;

			if (boid.x < -boid.r) {
				boid.x += width + 2 * boid.r;
			} else if (boid.x > width + boid.r) {
				boid.x -= width + 2 * boid.r;
			}

			if (boid.y < -boid.r) {
				boid.y += height + 2 * boid.r;
			} else if (boid.y > height + boid.r) {
				boid.y -= height + 2 * boid.r;
			}

			for (const other of boids) {
				if (boid === other) continue;

				const dx = boid.x - other.x;
				const dy = boid.y - other.y;
				const dist = Math.hypot(dx, dy);

				if (dist < 200) {
					boid.vx += (dx / dist / dist) * 0.5;
					boid.vy += (dy / dist / dist) * 0.5;
				}
			}

			boid.vx *= 0.99;
			boid.vy *= 0.99;
		}

		if ($mousePressed < 0.01) {
			$mouseStrength = $mouseStrength * 0.9;
		} else {
			$mouseStrength = $mouseStrength * 0.9 + 0.1;
		}

		boids = boids;
	}

	let animationFrameRequest: number;

	function loop() {
		update();

		animationFrameRequest = requestAnimationFrame(loop);
	}

	onMount(() => {
		resize();
		loop();

		return () => cancelAnimationFrame(animationFrameRequest);
	});
</script>

<svelte:window
	on:resize={resize}
	on:mousemove={e => {
		$mousePosition = { x: e.clientX, y: e.clientY };
		$mouseStrength = 1;
	}}
	on:touchmove={e => {
		$mousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
		$mouseStrength = 1;
	}}
	on:mousedown={() => {
		$mousePressed = 1;
	}}
	on:touchstart={() => {
		$mousePressed = 1;
		$mouseStrength = 1;
	}}
	on:mouseup={() => {
		$mousePressed = 0;
	}}
	on:touchend={() => {
		$mousePressed = 0;
	}}
	on:mouseleave={() => {
		$mousePressed = 0;
	}}
	on:touchcancel={() => {
		$mousePressed = 0;
	}}
	on:blur={() => {
		$mousePressed = 0;
	}}
/>

<div aria-hidden="true" class="h-[100lvh] fixed" bind:this={refDiv}></div>

<svg
	class="w-screen h-screen fixed -z-10 top-0 left-0 pointer-events-none"
	viewBox="0 0 {width ?? 0} {height ?? 0}"
>
	<defs>
		{#each boids as boid, i}
			<radialGradient
				id="boidGradient{i}"
				cx="50%"
				cy="50%"
				r="50%"
				fx="50%"
				fy="50%"
			>
				<stop
					offset="0%"
					stop-color="hsla({boid.hue}, 100%, 50%, 0.1)"
				/>
				<stop
					offset="100%"
					stop-color="hsla({boid.hue}, 100%, 50%, 0)"
				/>
			</radialGradient>
		{/each}

		<radialGradient
			id="mouseGradient"
			cx="50%"
			cy="50%"
			r="50%"
			fx="50%"
			fy="50%"
		>
			<stop
				offset="0%"
				stop-color="hsla(270, 100%, 50%, {$mouseStrength *
					($mousePressed * 0.125 + 0.125)})"
			/>
			<stop offset="100%" stop-color="hsla(270, 100%, 50%, 0)" />
		</radialGradient>
	</defs>

	{#each boids as boid, i}
		<circle
			cx={boid.x}
			cy={boid.y}
			r={boid.r}
			fill="url(#boidGradient{i})"
		/>
	{/each}

	<circle
		cx={$mousePosition.x}
		cy={$mousePosition.y}
		r={$mouseStrength * 100}
		fill="url(#mouseGradient)"
	/>
</svg>

<style lang="postcss">
	svg {
		view-transition-name: background;
	}
</style>
