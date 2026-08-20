<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Research from './Research.svelte';
</script>

<Meta title="Research – Daniel" description="My research." />

<main>
	<div class="wrapper fade">
		<h1 class="header">Research</h1>

		<p class="mt-4 text-gray-400">My research work.</p>
	</div>

	<div class="mt-8 fade fade-delay mx-auto max-w-4xl px-8">
		<Research
			name="Examining the Limits of Word2Vec with Toki Pona"
			href="https://aclanthology.org/2026.scil-main.4/"
			src="/images/research/word2vec.png"
		>
			<p class="text-sm text-gray-400">
				2026 &middot; Coauthored with <a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.wuhongchen.com/"
					class="text-white font-medium hover:underline"
				>
					Dr. Hongchen Wu
				</a>
			</p>
			<p class="mt-2 text-gray-300 text-sm">
				Toki Pona only has ~130 words; how effective can Word2Vec be
				with such a small vocabulary? We investigate model performance
				on a large conversational corpus of Toki Pona, developing unique
				evaluation methods suited to the language's small lexicon.
			</p>
			<p class="mt-2 text-gray-300 text-sm">
				We find that models are effective at generating clusters of
				semantically similar words, whose structures mirror that of
				natural languages.
			</p>
			<p class="mt-2 text-gray-300 text-sm">
				This research was presented at the Society for Computation in
				Linguistics 2026.
			</p>
		</Research>

		<Research
			name="A Computational Approach to Analyzing Language Change and Variation in the Constructed Language Toki Pona"
			href="https://arxiv.org/abs/2508.10246"
			src="/images/research/variation.png"
		>
			<p class="text-sm text-gray-400">
				2025 &middot; Coauthored with <a
					target="_blank"
					rel="noopener noreferrer"
					href="https://modlangs.gatech.edu/people/person/joohyouna"
					class="text-white font-medium hover:underline"
				>
					Dr. Hyoun-A Joo
				</a>
			</p>
			<p class="mt-2 text-gray-300 text-sm">
				Do constructed languages evolve over time like natual languages?
				We examine language variation in Toki Pona by developing a
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://nasin.nimi.li"
					class="text-white font-medium hover:underline"
				>
					Toki Pona parser
				</a> to analyze changes in syntactic positions of content words over
				time and across corpora.
			</p>
			<p class="mt-2 text-gray-300 text-sm">
				Results suggest that sociolinguistic factors influence Toki Pona
				in the same way as natural languages; even constructed
				linguistic systems naturally evolve as communities use them.
			</p>
			<p class="mt-2 text-gray-300 text-sm">
				This research was presented at the Emory Undergraduate
				Linguistics Conference 2025.
			</p>
		</Research>
	</div>
</main>
