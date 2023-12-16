<script>
	import '../app.postcss';

	import { onNavigate } from '$app/navigation';

	import NavLink from './NavLink.svelte';

	onNavigate(navigation => {
		if (!document.startViewTransition) return;

		return new Promise(resolve => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<nav class="wrapper mt-20 md:mt-32 text-gray-400">
	<ul class="flex flex-wrap gap-x-12 gap-y-2">
		<NavLink href="/">Home</NavLink>
		<NavLink href="/projects">Projects</NavLink>
		<NavLink href="/music">Music</NavLink>
	</ul>
</nav>

<div class="mt-12 md:mt-20 mb-20 md:mb-32">
	<slot />
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(theme(width.8));
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(calc(-1 * theme(width.8)));
		}
	}

	:root::view-transition-old(content) {
		animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(content) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}

	nav {
		view-transition-name: nav;
	}

	div {
		view-transition-name: content;
	}
</style>
