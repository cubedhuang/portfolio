<script>
	import ArrowLeftMini from '#lib/components/icons/ArrowLeftMini.svelte';
	import ArrowRightMini from '#lib/components/icons/ArrowRightMini.svelte';
</script>

<div class="mt-4 flex gap-2">
	<a
		class="h-10 w-10 bg-surface rounded-full grid place-items-center hover:bg-surface-raised transition"
		href="https://kiyuri.ca"
		rel="external"
		aria-label="previous in webring"
	>
		<ArrowLeftMini />
	</a>
	<div
		class="text-muted text-sm bg-surface rounded-full flex-1 flex gap-2 justify-center items-center"
	>
		Bay Leaf Webring
	</div>
	<a
		class="h-10 w-10 bg-surface rounded-full grid place-items-center hover:bg-surface-raised transition"
		href="https://julianlbauer.com"
		rel="external"
		aria-label="next in webring"
	>
		<ArrowRightMini />
	</a>
</div>
