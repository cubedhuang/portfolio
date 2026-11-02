<script lang="ts">
	import Meta from '#lib/components/Meta.svelte';
	import Research from './Research.svelte';
</script>

<Meta title="Research – Daniel" description="My research." />

<main>
	<div class="wrapper fade">
		<h1 class="header">Research</h1>

		<p class="mt-4 mb-6 text-muted">My research.</p>

		<Research
			name="Examining the Limits of Word2Vec with Toki Pona"
			href="https://aclanthology.org/2026.scil-main.4/"
			src="/images/research/word2vec.png"
		>
			<p>
				2026 &middot; Coauthored with <a
					target="_blank"
					rel="external noopener noreferrer"
					href="https://www.wuhongchen.com/"
				>
					Dr. Hongchen Wu
				</a>
			</p>
			<p class="mt-2">
				Toki Pona only has ~130 words; how effective can Word2Vec be
				with such a small vocabulary? We investigate model performance
				on a large conversational corpus of Toki Pona, developing unique
				evaluation methods suited to the language's small lexicon.
			</p>
			<p class="mt-2">
				We find that models are effective at generating clusters of
				semantically similar words, whose structures mirror that of
				natural languages.
			</p>
			<p class="mt-2">
				This research was presented at the Society for Computation in
				Linguistics 2026.
			</p>
		</Research>

		<Research
			name="A Computational Approach to Analyzing Language Change and Variation in the Constructed Language Toki Pona"
			href="https://arxiv.org/abs/2508.10246"
			src="/images/research/variation.png"
		>
			<p>
				2025 &middot; Coauthored with <a
					target="_blank"
					rel="external noopener noreferrer"
					href="https://modlangs.gatech.edu/people/person/joohyouna"
				>
					Dr. Hyoun-A Joo
				</a>
			</p>
			<p class="mt-2">
				Do constructed languages evolve over time like natual languages?
				We examine language variation in Toki Pona by developing a
				<a
					target="_blank"
					rel="external noopener noreferrer"
					href="https://nasin.nimi.li"
				>
					Toki Pona parser
				</a> to analyze changes in syntactic positions of content words over
				time and across corpora.
			</p>
			<p class="mt-2">
				Results suggest that sociolinguistic factors influence Toki Pona
				in the same way as natural languages; even constructed
				linguistic systems naturally evolve as communities use them.
			</p>
			<p class="mt-2">
				This research was presented at the Emory Undergraduate
				Linguistics Conference 2025.
			</p>
		</Research>
	</div>
</main>

<style lang="postcss">
	@reference "../../app.css";

	p:not(h1 + p) {
		@apply text-muted text-sm;
	}

	a {
		@apply text-foreground font-medium underline decoration-current/30 underline-offset-2 transition hover:decoration-accent;
	}
</style>
