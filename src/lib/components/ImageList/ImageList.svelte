<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { getEntries } from '$lib/entries.svelte';
	import Card from './Card.svelte';
	import { crossfade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let entries = getEntries();
	let unprocessed = $derived(entries.all.filter((entry) => entry.kind != 'processed'));
	let processed = $derived(entries.all.filter((entry) => entry.kind == 'processed'));

	let [send, receive] = crossfade({});
</script>

<div class="container">
	<header>
		<h2>Images</h2>
		<Button kind="subtle" onclick={() => entries.clearAll()}>Clear all</Button>
	</header>
	<section class:hidden={unprocessed.length == 0}>
		<header>
			<h3>Unprocessed</h3>
			<Button kind="subtle" onclick={() => entries.clearPending()}>Clear</Button>
		</header>
		<ul aria-label="Unprocessed images">
			{#each unprocessed as entry (entry.id)}
				<li
					in:fly|global={{ x: -50 }}
					out:send={{ key: entry.id }}
					animate:flip={{ duration: 500 }}
				>
					<Card {entry} />
				</li>
			{/each}
		</ul>
	</section>
	<section class:hidden={processed.length == 0}>
		<header>
			<h3>Processed</h3>
			<div>
				<Button kind="subtle" onclick={() => entries.clearProcessed()}>Clear</Button>
				<Button color="primary" onclick={() => entries.downloadProcessed()}>Download all</Button>
			</div>
		</header>
		<ul aria-label="Processed images">
			{#each processed as entry (entry.id)}
				<li in:receive={{ key: entry.id }}>
					<Card {entry} />
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.container > header {
		/* Sticky header */
		position: sticky;
		top: 0px;
		z-index: 49;

		/* Appearance */
		background-color: var(--bg-surface);
		border-bottom: 1px solid var(--border-muted);

		/* Spacing */
		padding: 1rem;
	}

	section {
		/* Spacing */
		padding: 1rem;

		/* Appearance */
		background-color: transparent;
	}

	.hidden {
		display: none;
	}

	header {
		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;

		/* Spacing */
		padding-block: 0.25rem;
	}

	header > div {
		/* Layout */
		display: flex;

		/* Spacing */
		gap: 1rem;
	}

	h2 {
		/* Font */
		font-size: var(--text-lg);
		font-weight: 500;
	}

	h3 {
		/* Font */
		font-size: var(--text-default);
		font-weight: 400;
	}

	ul {
		/* Appearance */
		list-style: none;

		/* Layout */
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

		/* Spacing */
		gap: 2rem;
		padding-block: 1rem;
	}

	li {
		/* Appearance */
		background-color: var(--bg-surface);
		border: 1px solid var(--border-muted);
	}

	@media (min-width: 900px) {
		.container {
			/* Force scrolling */
			height: 100%;
			overflow-y: auto;
		}
	}
</style>
