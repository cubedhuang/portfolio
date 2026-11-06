<script lang="ts">
	import type { Picture } from 'vite-imagetools';

	export let name: string;
	export let href: string;
	export let src: Picture;
	export let loading: 'eager' | 'lazy' = 'lazy';
</script>

<div class="mt-4 grid md:grid-cols-3 rounded-xl overflow-hidden lg:-mx-8">
	<div class="p-6 md:col-span-2 md:p-8 bg-surface max-md:row-start-2">
		<h2 class="mb-2 font-bold text-lg sm:text-xl leading-tight text-pretty">
			<a
				{href}
				target="_blank"
				rel="external noopener noreferrer"
				class="underline decoration-transparent underline-offset-2 transition hover:decoration-accent"
			>
				{name}
			</a>
		</h2>

		<slot />
	</div>

	<div class="relative overflow-hidden max-md:h-28">
		<enhanced:img
			{src}
			{loading}
			alt=""
			class="bg-surface-raised absolute top-0 left-0 w-full h-full object-cover"
		/>
	</div>
</div>
