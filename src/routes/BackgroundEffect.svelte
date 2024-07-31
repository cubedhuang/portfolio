<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let canvas: HTMLCanvasElement;
	let refDiv: HTMLDivElement;
	let ctx: CanvasRenderingContext2D;

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

	const boids: Boid[] = [];

	function resize() {
		ctx.resetTransform();

		const dw = window.innerWidth / width;
		const dh = refDiv.clientHeight / height;

		for (const boid of boids) {
			boid.x *= dw;
			boid.y *= dh;
		}

		width = window.innerWidth;
		height = refDiv.clientHeight;

		canvas.width = width * devicePixelRatio;
		canvas.height = height * devicePixelRatio;

		ctx.scale(devicePixelRatio, devicePixelRatio);

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

	function draw() {
		ctx.clearRect(0, 0, width, height);

		for (const boid of boids) {
			ctx.beginPath();
			ctx.arc(boid.x, boid.y, boid.r, 0, Math.PI * 2);

			const color = `hsla(${boid.hue}, 100%, 50%, 0.1)`;

			const gradient = ctx.createRadialGradient(
				boid.x,
				boid.y,
				0,
				boid.x,
				boid.y,
				boid.r
			);
			gradient.addColorStop(0, color);
			gradient.addColorStop(1, `hsla(${boid.hue}, 100%, 50%, 0)`);

			ctx.fillStyle = gradient;
			ctx.fill();
		}

		ctx.beginPath();
		ctx.arc(
			$mousePosition.x,
			$mousePosition.y,
			$mouseStrength * 100,
			0,
			Math.PI * 2
		);

		const gradient = ctx.createRadialGradient(
			$mousePosition.x,
			$mousePosition.y,
			0,
			$mousePosition.x,
			$mousePosition.y,
			$mouseStrength * 100
		);
		gradient.addColorStop(
			0,
			`hsla(270, 100%, 50%, ${
				$mouseStrength * ($mousePressed * 0.125 + 0.125)
			})`
		);
		gradient.addColorStop(1, `hsla(270, 100%, 50%, 0)`);

		ctx.fillStyle = gradient;
		ctx.fill();
	}

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
	}

	let animationFrameRequest: number;

	function loop() {
		update();
		draw();

		animationFrameRequest = requestAnimationFrame(loop);
	}

	onMount(() => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
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

<canvas
	class="w-screen h-screen fixed -z-10 top-0 left-0 bg-transparent pointer-events-none"
	bind:this={canvas}
></canvas>

<style lang="postcss">
	canvas {
		view-transition-name: background;
	}
</style>
