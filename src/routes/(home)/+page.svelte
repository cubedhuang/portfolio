<script lang="ts">
	import { resolve } from '$app/paths';

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
		science and linguistics at the Georgia Institute of Technology. I'm
		interested in programming languages, compilers, and systems, as well as
		computational corpus linguistics and theoretical syntax.
	</p>
	<p>
		At Georgia Tech, I develop teaching material and maintain
		<a
			href="https://github.com/gt-cs2110"
			rel="external noopener noreferrer"
			target="_blank">course software</a
		>
		as a Senior Teaching Assistant for CS 2110, Computer Organization and Programming.
		I also founded and run the
		<a
			href="https://www.instagram.com/linguisticsgatech/"
			rel="external noopener noreferrer"
			target="_blank"
		>
			Linguistics Club</a
		>, where we hold weekly meetings on various topics of interest.
	</p>
	<p>
		I'm also an avid <a
			href="https://tokipona.net"
			rel="external noopener noreferrer"
			target="_blank">tokiponist</a
		>
		and have created a
		<a
			href="https://nimi.li"
			rel="external noopener noreferrer"
			target="_blank">dictionary</a
		>, an
		<a
			href="https://youtu.be/5phj5Ae80h8"
			rel="external noopener noreferrer"
			target="_blank">introductory video</a
		>, and
		<a
			href="https://nasin.nimi.li"
			rel="external noopener noreferrer"
			target="_blank">corpus tools</a
		>
		for the language. I've presented my
		<a href={resolve('research')}>research</a> at the Society for Computation
		in Linguistics and the Emory Undergraduate Linguistics Conference.
	</p>
	<p>
		<i>sina toki pona la o toki tawa mi a!</i>
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
		@apply leading-relaxed sm:leading-[1.75] text-pretty text-muted;
	}

	p + p {
		@apply mt-4;
	}

	b {
		@apply font-semibold text-foreground;
	}

	a {
		@apply font-medium text-accent underline decoration-current/30 underline-offset-2 transition hover:decoration-current;
	}
</style>
