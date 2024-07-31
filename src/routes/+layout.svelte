<script lang="ts">
	import '../app.postcss';

	import { onNavigate } from '$app/navigation';

	import NavLink from './NavLink.svelte';
	import BackgroundEffect from './BackgroundEffect.svelte';

	function getBaseRoute(pathname: string | undefined) {
		return pathname?.match(/\/[^/]*/)?.[0] ?? '/';
	}

	const order = ['/', '/projects', '/music'];

	onNavigate(navigation => {
		if (!document.startViewTransition) return;

		const from = getBaseRoute(navigation.from?.url.pathname);
		const to = getBaseRoute(navigation.to?.url.pathname);

		const fromIndex = order.indexOf(from);
		const toIndex = order.indexOf(to);

		const direction = fromIndex < toIndex ? '-1' : '1';
		document.documentElement.style.setProperty('--direction', direction);

		return new Promise(resolve => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<BackgroundEffect />

<nav class="wrapper mt-20 md:mt-32 text-gray-400">
	<ul class="flex flex-wrap gap-x-12 gap-y-2">
		<NavLink href="/">Home</NavLink>
		<NavLink href="/projects">Projects</NavLink>
		<NavLink href="/music">Music</NavLink>
	</ul>
</nav>

<div class="mt-16 md:mt-20 mb-20 md:mb-32">
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

	@keyframes slide-in {
		from {
			transform: translateX(calc(-1 * theme(width.8) * var(--direction)));
		}
	}

	@keyframes slide-out {
		to {
			transform: translateX(calc(theme(width.8) * var(--direction)));
		}
	}

	:root::view-transition-old(content) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-out;
	}

	:root::view-transition-new(content) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-in;
	}

	nav {
		view-transition-name: nav;
	}

	div {
		view-transition-name: content;
	}
</style>
