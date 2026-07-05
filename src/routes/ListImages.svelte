<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Progress from '$lib/components/Progress.svelte';
	import { getEntries } from '$lib/entries.svelte';
	import { ArrowDownToLine, Images, Trash2 } from '@lucide/svelte';

	let entries = getEntries();
</script>

<div class="container">
	{#if entries.isEmpty()}
		<div class="placeholder">
			<div>
				<span>
					<Images />
				</span>
				<p>Upload images to get started.</p>
			</div>
		</div>
	{:else}
		<header>
			<h2>Images</h2>
			<Button kind="subtle" onclick={() => entries.clearAll()}>Clear all</Button>
		</header>
	{/if}
	{#if entries.notProcessed.length}
		<section>
			<header>
				<h3>Unprocessed</h3>
				<Button kind="ghost" onclick={() => entries.clearUnprocessed()}>Clear</Button>
			</header>
			<ul aria-label="Unprocessed images">
				{#each entries.notProcessed as entry (entry.id)}
					<li>
						<figure>
							<img src={entry.src} alt="" />
							<figcaption>
								<p title={entry.file.name}>{entry.file.name}</p>
								<Button kind="ghost" onclick={() => entries.remove(entry)}>
									<Trash2 />
								</Button>
							</figcaption>
						</figure>
						<Progress
							aria-label="Upload progress"
							aria-hidden={entry.isUnprocessed()}
							value={entry.isProcessing() ? entry.state.progress : 0}
						/>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	{#if entries.processed.length}
		<section>
			<header>
				<h3>Processed</h3>
				<div>
					<Button kind="ghost" onclick={() => entries.clearProcessed()}>Clear</Button>
					<Button kind="filled" onclick={() => entries.downloadAll()}>Download all</Button>
				</div>
			</header>
			<ul aria-label="Processed images">
				{#each entries.processed as entry (entry.id)}
					<li>
						<figure>
							<img src={entry.state.out} alt="" />
							<figcaption>
								<p title={entry.file.name}>{entry.file.name}</p>
								<Button kind="ghost" onclick={() => entry.download()}>
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

		& div {
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

		& span {
			/* Size */
			aspect-ratio: 1;
			font-size: 1.25rem;

			/* Appearance */
			background-color: var(--neutral-100);
			border-radius: 100%;

			/* Layout */
			display: flex;
			justify-content: center;
			align-items: center;

			/* Spacing */
			padding: 1rem;
		}
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
