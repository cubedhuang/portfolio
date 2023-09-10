<script lang="ts">
	import Clock from '$lib/components/Clock.svelte';
	import DiscordInfo from '$lib/components/DiscordInfo.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Spotify from '$lib/components/icons/Spotify.svelte';
	import SpotifyInfo from '$lib/components/SpotifyInfo.svelte';
	import Twitter from '$lib/components/icons/Twitter.svelte';
</script>

<svelte:head>
	<title>Daniel</title>
</svelte:head>

<div class="wrapper mt-40 mb-20">
	<h1 class="text-4xl font-black">Daniel!</h1>

	<p class="mt-2 text-zinc-400">
		Hey! I'm <b>Daniel</b>, a 17-year-old developer from
		<b>Atlanta, Georgia</b>.
	</p>

	<div class="mt-2 flex gap-4">
		<a
			href="https://github.com/cubedhuang"
			target="_blank"
			rel="noopener noreferrer"
		>
			<GitHub />
		</a>

		<a
			href="https://twitter.com/cubedhuang"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Twitter />
		</a>

		<a
			href="https://open.spotify.com/user/22ah5au2dajm7rqn3znkf4tnq?si=95e89d77cb0046f5"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Spotify />
		</a>
	</div>

	<p class="mt-8 flex text-sm gap-2 items-center text-white">
		<Clock />
	</p>

	<DiscordInfo />
	<!-- <SpotifyInfo /> -->
</div>

<style lang="postcss">
	b {
		@apply text-zinc-300 font-semibold;
	}
</style>
