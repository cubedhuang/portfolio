<script lang="ts">
	import Clock from './Clock.svelte';
	import DiscordInfo from './DiscordInfo.svelte';
	import SocialLink from './SocialLink.svelte';
	import SpotifyInfo from './SpotifyInfo.svelte';
	import Weather from './Weather.svelte';

	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Envelope from '$lib/components/icons/Envelope.svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import Spotify from '$lib/components/icons/Spotify.svelte';
	import Twitter from '$lib/components/icons/Twitter.svelte';
	import Meta from '$lib/components/Meta.svelte';
</script>

<Meta title="Daniel" description="My portfolio and personal website." />

<main class="wrapper fade">
	<h1 class="header">Daniel Huang</h1>

	<p class="mt-4 text-gray-400">
		Hey! I'm <b>Daniel</b>, a frontend developer from
		<b>Atlanta, Georgia</b>.
	</p>

	<div class="mt-4 flex gap-6">
		<SocialLink href="https://github.com/cubedhuang" name="GitHub">
			<GitHub />
		</SocialLink>

		<SocialLink
			href="https://www.linkedin.com/in/cubedhuang"
			name="LinkedIn"
		>
			<Linkedin />
		</SocialLink>

		<SocialLink href="https://twitter.com/cubedhuang" name="Twitter">
			<Twitter />
		</SocialLink>

		<SocialLink
			href="https://open.spotify.com/user/22ah5au2dajm7rqn3znkf4tnq?si=95e89d77cb0046f5"
			name="Spotify"
		>
			<Spotify />
		</SocialLink>

		<SocialLink href="mailto:daniel@huang.bio" name="Email">
			<Envelope />
		</SocialLink>
	</div>

	<Clock />
	<Weather />

	<DiscordInfo />
	<SpotifyInfo />
</main>
