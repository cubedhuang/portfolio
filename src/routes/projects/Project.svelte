<script lang="ts">
	export let name: string;
	export let src: string;
</script>

<div class="group mt-8 group grid sm:grid-cols-2 rounded-xl overflow-hidden">
	<div class="p-8 bg-gray-900 max-sm:row-start-2">
		<h2 class="font-bold text-3xl">{name}</h2>

		<p class="mt-4 text-gray-400">
			<slot />
		</p>
	</div>

	<div class="relative overflow-hidden max-sm:h-24">
		<img
			{src}
			alt=""
			class="absolute top-0 left-0 w-full h-full object-cover
					group-hover:scale-105 transition duration-300"
		/>
	</div>
</div>
