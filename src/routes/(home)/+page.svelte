<script lang="ts">
	import Clock from './Clock.svelte';
	import DiscordInfo from './DiscordInfo.svelte';
	import SocialLink from './SocialLink.svelte';
	import SpotifyInfo from './SpotifyInfo.svelte';
	import Weather from './Weather.svelte';
	import Webring from './Webring.svelte';

	import GitHub from '#lib/components/icons/GitHub.svelte';
	import Envelope from '#lib/components/icons/Envelope.svelte';
	import Linkedin from '#lib/components/icons/Linkedin.svelte';
	import Spotify from '#lib/components/icons/Spotify.svelte';
	import Twitter from '#lib/components/icons/Twitter.svelte';
	import Meta from '#lib/components/Meta.svelte';
</script>

<Meta title="Daniel" description="My portfolio and personal website." />

<main class="wrapper fade">
	<h1 class="header">Daniel Huang</h1>

	<p class="mt-6">
		Hi! I'm <b>Daniel</b>, an undergraduate student studying computer
		science and linguistics at the Georgia Institute of Technology.
	</p>
	<p>
		I'm interested in programming languages, compilers, and systems as well
		as computational corpus linguistics and theoretical syntax.
	</p>
	<p>
		At Georgia Tech, I develop teaching material and maintain
		<a href="https://github.com/gt-cs2110">course software</a> as a Senior
		Teaching Assistant for CS 2110 (Computer Organization and Programming)
		and organize weekly meetings on various topics of interest with the
		<a href="https://www.instagram.com/linguisticsgatech/">
			Linguistics Club</a
		>.
	</p>

	<div class="my-6 flex gap-6">
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

	<Webring />
</main>

<style lang="postcss">
	@reference '../../app.css';

	p {
		@apply leading-relaxed text-pretty text-gray-300;
	}

	p + p {
		@apply mt-4;
	}

	b {
		@apply font-semibold text-white;
	}

	a {
		@apply text-violet-300 underline decoration-violet-300/30 underline-offset-2 transition hv:decoration-violet-300;
	}
</style>
