<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Progress from '$lib/components/Progress.svelte';
	import { getEntries } from '$lib/entries.svelte';
	import { downloadEntry } from '$lib/entry';
	import { ArrowDownToLine, Images, Trash2 } from '@lucide/svelte';

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
				<Button kind="ghost" onclick={() => entries.clearBase()}>Clear</Button>
			</header>
			<ul aria-label="Unprocessed images">
				{#each unprocessed as entry (entry.id)}
					<li>
						<figure>
							<img src={entry.src} aria-labelledby="filename-{entry.id}" alt={entry.file.name} />
							<figcaption>
								<p id="filename-{entry.id}" title={entry.file.name}>{entry.file.name}</p>
								<Button
									kind="ghost"
									onclick={() => entries.remove(entry)}
									aria-label="Remove"
									title="Remove"
								>
									<Trash2 />
								</Button>
							</figcaption>
						</figure>
						<Progress
							aria-label="Upload progress"
							aria-hidden={entry.kind == 'base'}
							value={entry.kind == 'processing' ? entry.progress : 0}
						/>
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
					<Button kind="filled" onclick={() => entries.downloadAll()}>Download all</Button>
				</div>
			</header>
			<ul aria-label="Processed images">
				{#each processed as entry (entry.id)}
					<li>
						<figure>
							<img src={entry.out} aria-labelledby="filename-{entry.id}" alt={entry.file.name} />
							<figcaption>
								<p id="filename-{entry.id}" title={entry.file.name}>{entry.file.name}</p>
								<Button
									kind="ghost"
									onclick={() => downloadEntry(entry)}
									aria-label="Download"
									title="Download"
								>
									<ArrowDownToLine />
								</Button>
							</figcaption>
						</figure>
						<Progress aria-hidden="true" value={0} />
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
		background-color: white;

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
		background-color: white;
	}

	figcaption {
		/* Spacing */
		padding: 0.5rem 0.5rem 0.5rem 0.75rem;
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

		.placeholder {
			/* Show placeholder on desktop */
			display: flex;
		}
	}
</style>
