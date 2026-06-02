<script lang="ts">
	import type { Entry } from '$lib/types/entry.svelte';
	import { ArrowDownToLine, Trash2 } from '@lucide/svelte';
	import IconButton from './IconButton.svelte';
	import Progress from './Progress.svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
</script>

<div>
	<h2>Files</h2>
	<ul aria-label="Files">
		{#each entries as entry (entry.id)}
			<li>
				<p>{entry.file.name}</p>
				{#if entry.status === 'new'}
					<IconButton
						onclick={() => (entries = entries.filter((f) => f.id !== entry.id))}
						aria-label={`Remove ${entry.file.name}`}
					>
						<Trash2 />
					</IconButton>
				{:else if entry.status === 'uploading'}
					<span style:padding="var(--size-1)">
						<Progress progress={entry.progress} />
					</span>
				{:else if entry.status === 'processing'}
					<span style:padding="var(--size-1)">
						<code style:font-size="var(--text-sm)">Processing</code>
					</span>
				{:else if entry.status === 'success'}
					<IconButton
						onclick={() => entry.download()}
						aria-label={`Download result for ${entry.file.name}`}
					>
						<ArrowDownToLine />
					</IconButton>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	div {
		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: var(--size-2);
	}

	h2 {
		/* Appearance */
		color: var(--neutral-700);

		/* Spacing (align with items) */
		padding-left: var(--size-2);

		/* Font */
		font-size: var(--text-normal);
	}

	ul {
		/* Reset styles */
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		/* Appearance */
		border-top: 1px solid var(--neutral-300);

		/* Spacing */
		padding: var(--size-2);

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;

		&:last-child {
			border-bottom: 1px solid var(--neutral-300);
		}
	}
</style>
