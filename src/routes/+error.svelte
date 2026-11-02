<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<main class="wrapper fade">
	<h1 class="header">
		{page.status} &ndash;
		{page.error?.message ?? 'Unknown error'}
	</h1>

	<p class="mt-4 text-gray-300">
		Seems like this page doesn't exist. Let's go back
		<a href={resolve('')} class="text-white">home</a>.
	</p>
</main>
