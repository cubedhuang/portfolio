<script lang="ts">
	export let name: string;
	export let href: string;
	export let src: string;
</script>

<div class="mt-4 grid md:grid-cols-3 rounded-xl overflow-hidden">
	<div class="p-6 md:col-span-2 md:p-8 bg-gray-900 max-md:row-start-2">
		<h2 class="mb-2 font-bold text-lg sm:text-xl leading-tight text-pretty">
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-gray-300 transition"
			>
				{name}
			</a>
		</h2>

		<slot />
	</div>

	<div class="relative overflow-hidden max-md:h-28">
		<img
			{src}
			alt=""
			class="absolute top-0 left-0 w-full h-full object-cover"
		/>
	</div>
</div>
