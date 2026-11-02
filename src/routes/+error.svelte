<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<main class="wrapper fade">
	<h1 class="header">
		{page.status} &ndash;
		{page.error?.message ?? 'Unknown error'}
	</h1>

	<p class="mt-4 text-muted">
		Seems like this page doesn't exist. Let's go back
		<a href={resolve('')} class="text-foreground">home</a>.
	</p>
</main>
