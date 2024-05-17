<script lang="ts">
	export let name: string;
	export let href: string;
	export let src: string;
</script>

<div class="mt-4">
	<a
		{href}
		target="_blank"
		rel="noopener noreferrer"
		class="grid sm:grid-cols-2 rounded-xl overflow-hidden
			hv:scale-[1.02] transition duration-300"
	>
		<div class="p-6 md:p-8 bg-gray-900 max-sm:row-start-2">
			<h2 class="font-bold text-2xl">{name}</h2>

			<p class="mt-2 text-gray-400">
				<slot />
			</p>
		</div>

		<div class="relative overflow-hidden max-sm:h-24">
			<img
				{src}
				alt=""
				class="absolute top-0 left-0 w-full h-full object-cover"
			/>
		</div>
	</a>
</div>
