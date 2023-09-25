import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const now = readable(new Date(), set => {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return () => clearInterval(interval);
});

export const fastNow = readable(new Date(), set => {
	if (!browser) return;

	let id = requestAnimationFrame(function update() {
		set(new Date());
		id = requestAnimationFrame(update);
	});

	return () => cancelAnimationFrame(id);
});
