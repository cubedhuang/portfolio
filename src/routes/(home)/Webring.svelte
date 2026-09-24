<script>
	import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/components/icons/ArrowRight.svelte';
</script>

<div class="mt-4 flex gap-2">
	<a
		class="h-12 w-12 bg-slate-800 rounded-full grid place-items-center hover:bg-slate-700 transition"
		href="https://kiyuri.ca"
		rel="external"
		aria-label="previous in webring"
	>
		<ArrowLeft />
	</a>
	<div
		class="text-slate-200 text-sm bg-slate-900 rounded-full flex-1 flex gap-2 justify-center items-center"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-white"
			><path
				d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"
			/><path
				d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"
			/></svg
		>
		Bay Leaf Webring
	</div>
	<a
		class="h-12 w-12 bg-slate-800 rounded-full grid place-items-center hover:bg-slate-700 transition"
		href="https://julianlbauer.com"
		rel="external"
		aria-label="next in webring"
	>
		<ArrowRight />
	</a>
</div>
