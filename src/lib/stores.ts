import { readable } from 'svelte/store';

export const now = readable(new Date(), set => {
	const interval = setInterval(() => {
		set(new Date());
	}, 100);

	return () => clearInterval(interval);
});
