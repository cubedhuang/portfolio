<script lang="ts">
	import '@fontsource-variable/inter/opsz.css';
	import '@fontsource-variable/inter/wght-italic.css';
	import '../app.css';

	import type { Snippet } from 'svelte';

	import { onNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { page } from '$app/state';
	import type { Path } from '$app/types';

	function getBaseRoute(pathname: string | undefined) {
		return pathname?.match(/\/[^/]*/)?.[0] ?? '/';
	}

	const order = ['/', '/projects', '/research', '/music'];

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

	const { children }: { children: Snippet } = $props();
</script>

<nav class="wrapper mt-20 md:mt-24 text-muted">
	<ul class="flex flex-wrap gap-x-6 sm:gap-x-12 gap-y-2">
		{#snippet link(href: Path, name: string)}
			{@const active = page.url.pathname === `/${href}`}
			<li>
				<a
					href={resolve(href)}
					class="transition font-medium {active
						? 'text-accent active'
						: ''}"
				>
					{name}
				</a>
			</li>
		{/snippet}

		{@render link('', 'Home')}
		{@render link('projects', 'Projects')}
		{@render link('research', 'Research')}
		{@render link('music', 'Music')}
	</ul>
</nav>

<div class="mt-12 md:mt-16 mb-20 md:mb-32">
	{@render children()}
</div>

<style lang="postcss">
	@reference "../app.css";

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
			transform: translateX(calc(-4 * var(--spacing) * var(--direction)));
		}
	}

	@keyframes slide-out {
		to {
			transform: translateX(calc(4 * var(--spacing) * var(--direction)));
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

	a.active {
		@apply relative after:block after:absolute after:top-full after:mt-0.5 after:left-1/2 after:-translate-x-1/2
		    after:bg-current after:rounded-full after:w-1 after:h-1 after:pointer-events-none;
	}

	div {
		view-transition-name: content;
	}
</style>
