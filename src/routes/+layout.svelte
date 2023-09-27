<script>
	import '../app.postcss';
	import NavLink from './NavLink.svelte';
</script>

<nav class="wrapper mt-20 md:mt-32 text-gray-400">
	<ul class="flex flex-wrap gap-x-12 gap-y-2">
		<NavLink href="/">Home</NavLink>
		<NavLink href="/projects">Projects</NavLink>
		<NavLink href="/music">Music</NavLink>
	</ul>
</nav>

<div class="mt-12 md:mt-20 mb-20">
	<slot />
</div>
