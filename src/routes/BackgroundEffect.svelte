<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';

	let refDiv = $state<HTMLDivElement>();

	let width = $state(0);
	let height = $state(0);

	class Boid {
		#r: number;

		x: number = $state(0);
		y: number = $state(0);
		vx: number;
		vy: number;
		hue: number;

		constructor() {
			this.#r = Math.random() * 1 + 1;
			this.x = Math.random() * (width + 2 * this.r) - this.r;
			this.y = Math.random() * (height + 2 * this.r) - this.r;

			this.vx = 0;
			this.vy = 0;
			this.hue = Math.random() * 60 + 260;
		}

		get r() {
			return (this.#r * width * height * devicePixelRatio) / 8000;
		}
	}

	let boids: Boid[] = $state([]);

	function resize() {
		if (!refDiv) return;

		const newWidth = window.innerWidth;
		const newHeight = refDiv.clientHeight;

		if (width > 0 && height > 0) {
			for (const boid of boids) {
				boid.x *= newWidth / width;
				boid.y *= newHeight / height;
			}
		}

		width = newWidth;
		height = newHeight;

		const amount = 20;

		while (boids.length < amount) {
			boids.push(new Boid());
		}
		boids.length = amount;
	}

	const mousePosition = new Spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.3
		}
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
		resize();
		animationFrameRequest = requestAnimationFrame(loop);

		return () => cancelAnimationFrame(animationFrameRequest);
	});
</script>

<svelte:window
	onresize={resize}
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

<div aria-hidden="true" class="h-lvh fixed" bind:this={refDiv}></div>

<svg
	class="w-screen h-screen fixed -z-10 top-0 left-0 pointer-events-none"
	viewBox="0 0 {width} {height}"
>
	<defs>
		{#each boids as boid, i (boid)}
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
					stop-color="oklch(0.5 0.25 {boid.hue} / 0.1)"
				/>
				<stop
					offset="100%"
					stop-color="oklch(0.5 0.25 {boid.hue} / 0)"
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
				stop-color="oklch(0.5 0.25 290 / {mouseStrength.current *
					(mousePressed.current * 0.125 + 0.125)})"
			/>
			<stop offset="100%" stop-color="oklch(0.5 0.25 290 / 0)" />
		</radialGradient>
	</defs>

	{#each boids as boid, i (boid)}
		<circle
			cx={boid.x}
			cy={boid.y}
			r={boid.r}
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
