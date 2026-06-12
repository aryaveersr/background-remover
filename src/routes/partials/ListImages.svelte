<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Entry, Status } from '$lib/entry.svelte';
	import { ArrowDownToLine, Trash2 } from '@lucide/svelte';

	interface Props {
		entries: Entry[];
		status: Status;
	}

	let { entries = $bindable(), status }: Props = $props();
</script>

<div class="container">
	<header>
		<h2>Images</h2>
		{#if entries.length}
			<Button kind="subtle" onclick={() => (entries = [])}>Clear all</Button>
		{/if}
	</header>
	{#if status === 'processed'}
		<Button
			size="md"
			style="width: 100%; margin-inline: 0.5rem;"
			onclick={() => entries.forEach((entry) => entry.download())}
		>
			Download all
			<ArrowDownToLine />
		</Button>
	{/if}
	<ul aria-label="Images">
		{#each entries as entry (entry.id)}
			<li>
				{#if entry.status == 'processed'}
					<img src={entry.srcOut} alt="Result" />
				{:else}
					<img src={entry.srcIn} alt="Input" />
				{/if}
				<div class="options">
					<p>{entry.file.name}</p>
					{#if entry.status == 'unprocessed'}
						<Button
							icon
							kind="subtle"
							color="danger"
							onclick={() => (entries = entries.filter((f) => f.id !== entry.id))}
						>
							<Trash2 />
						</Button>
					{:else if entry.status == 'processed'}
						<Button icon kind="subtle" onclick={() => entry.download()}>
							<ArrowDownToLine />
						</Button>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.container {
		/* Fill height */
		height: 100%;

		/* Appearance */
		background-color: white;
		border-radius: var(--radius-md);
		box-shadow:
			0px 0px 8px 2px var(--neutral-100),
			0px 1px 2px 0px var(--neutral-300);

		/* Spacing */
		padding: 1rem 0.5rem 0.5rem 0.5rem;
		gap: 1rem;

		/* Layout */
		display: flex;
		flex-direction: column;
	}

	header {
		/* Make the height same as the heading for alignment purposes */
		height: 30px;

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;

		/* Spacing */
		padding-inline: 0.5rem;
	}

	header h2 {
		/* Font */
		font-size: var(--text-lg);
		font-weight: 500;
	}

	ul {
		/* Reset styles */
		list-style: none;

		/* Layout */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));

		/* Spacing */
		gap: 2rem;
		padding: 0.5rem;
	}

	li {
		/* Layout */
		position: relative;

		/* Border */
		outline: 1px solid var(--neutral-200);
		border-radius: var(--radius-sm);

		box-shadow:
			0px 0px 8px 1px var(--neutral-100),
			0px 1px 2px 1px var(--neutral-200);
	}

	.options {
		/* Position */
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;

		/* Appearance */
		background-color: white;
		border-radius: var(--radius-md);
		box-shadow: 0px 0px 2px 1px var(--neutral-200);

		/* Spacing */
		padding: 0.75rem 1rem;
		gap: 1rem;

		/* Layout */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.options p {
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

		/* Border */
		border-radius: var(--radius-sm);

		/* Darken */
		filter: brightness(80%);
		transition: all var(--transition);

		li:hover & {
			filter: none;
		}
	}

	@media (min-width: 800px) {
		ul {
			overflow-y: auto;
		}

		li:only-child {
			height: unset;
			width: min(32rem, 100%);
		}
	}
</style>
