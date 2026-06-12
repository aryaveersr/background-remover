<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Entry } from '$lib/entry.svelte';
	import { ArrowDownToLine, Trash2 } from '@lucide/svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
	let unprocessed = $derived(entries.filter((entry) => entry.status != 'processed'));
	let processed = $derived(entries.filter((entry) => entry.status == 'processed'));
</script>

<div class="container">
	{#if entries.length}
		<header>
			<h2>Images</h2>
			{#if entries.length}
				<Button kind="subtle" onclick={() => (entries = [])}>Clear all</Button>
			{/if}
		</header>
	{:else}
		<div class="placeholder">
			<p>Upload images to get started.</p>
		</div>
	{/if}
	{#if unprocessed.length}
		<section>
			<header>
				<h3>Unprocessed</h3>
				<Button
					kind="ghost"
					onclick={() => (entries = entries.filter((entry) => entry.status == 'processed'))}
				>
					Clear
				</Button>
			</header>
			<ul aria-label="Unprocessed images">
				{#each unprocessed as entry (entry.id)}
					<li>
						<figure>
							<img src={entry.srcIn} alt="" />
							<figcaption>
								<p>{entry.file.name}</p>
								<Button
									kind="ghost"
									onclick={() => (entries = entries.filter((f) => f.id !== entry.id))}
								>
									<Trash2 />
								</Button>
							</figcaption>
						</figure>
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
					<Button
						kind="ghost"
						onclick={() => (entries = entries.filter((entry) => entry.status != 'processed'))}
					>
						Clear
					</Button>
					<Button kind="filled" onclick={() => processed.forEach((entry) => entry.download())}>
						Download all
					</Button>
				</div>
			</header>
			<ul aria-label="Processed images">
				{#each processed as entry (entry.id)}
					<li>
						<figure>
							<img src={entry.srcIn} alt="" />
							<figcaption>
								<p>{entry.file.name}</p>
								<Button kind="ghost" onclick={() => entry.download()}>
									<ArrowDownToLine />
								</Button>
							</figcaption>
						</figure>
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
		z-index: 99;

		/* Appearance */
		background-color: white;

		/* Spacing */
		padding: 1rem;
	}

	section {
		/* Spacing */
		padding: 1rem;
	}

	header {
		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;

		/* Appearance */
		border-bottom: 1px solid var(--neutral-200);

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
		font-size: var(--text-normal);
		font-weight: 400;
	}

	.placeholder {
		/* Hide placeholder on mobile */
		display: none;
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

	figure {
		/* Appearance */
		background-color: white;
	}

	figcaption {
		/* Spacing */
		padding: 0.5rem 0.5rem 0.75rem 0.75rem;
		gap: 1rem;

		/* Layout */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	figcaption p {
		/* Wrap filename */
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	img {
		/* Fill space */
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 1;
	}

	@media (min-width: 900px) {
		.container {
			/* Force scrolling */
			height: 100%;
			overflow-y: auto;
		}
	}
</style>
