<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { getEntries } from '$lib/entries.svelte';
	import { Images } from '@lucide/svelte';
	import Card from './Card.svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let entries = getEntries();
	let unprocessed = $derived(entries.all.filter((entry) => entry.kind != 'processed'));
	let processed = $derived(entries.all.filter((entry) => entry.kind == 'processed'));
</script>

<div class="container">
	{#if entries.isEmpty()}
		<div class="placeholder">
			<div>
				<Icon>
					<Images />
				</Icon>
				<p>Upload images to get started.</p>
			</div>
		</div>
	{:else}
		<header>
			<h2>Images</h2>
			<Button kind="subtle" onclick={() => entries.clearAll()}>Clear all</Button>
		</header>
	{/if}
	{#if unprocessed.length}
		<section>
			<header>
				<h3>Unprocessed</h3>
				<Button kind="ghost" onclick={() => entries.clearPending()}>Clear</Button>
			</header>
			<ul aria-label="Unprocessed images">
				{#each unprocessed as entry (entry.id)}
					<li in:fly|global={{ x: -50 }} animate:flip={{ duration: 500 }}>
						<Card {entry} />
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	{#if processed.length}
		<section>
			<header>
				<h3>Processed</h3>
				<div>
					<Button kind="ghost" onclick={() => entries.clearProcessed()}>Clear</Button>
					<Button color="primary" onclick={() => entries.downloadProcessed()}>Download all</Button>
				</div>
			</header>
			<ul aria-label="Processed images">
				{#each processed as entry (entry.id)}
					<li in:fly|global={{ y: -50 }}>
						<Card {entry} />
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>

<style>
	.container > header {
		/* Sticky header */
		position: sticky;
		top: 0px;
		z-index: 49;

		/* Appearance */
		background-color: var(--bg-surface);

		/* Spacing */
		padding: 1rem;
	}

	section {
		/* Spacing */
		padding: 1rem;

		/* Appearance */
		background-color: transparent;
	}

	header {
		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;

		/* Appearance */
		border-bottom: 1px solid var(--border-muted);

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

	.placeholder {
		/* Size */
		width: 100%;
		height: 100%;

		/* Hide placeholder on mobile */
		display: none;

		/* Layout */
		justify-content: center;
		align-items: center;
	}

	.placeholder div {
		/* Size */
		width: 50%;
		height: 50%;

		/* Layout */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		/* Appearance */
		background-color: var(--bg-surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-muted);

		/* Spacing */
		gap: 1.25rem;
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

		.placeholder {
			/* Show placeholder on desktop */
			display: flex;
		}
	}
</style>
