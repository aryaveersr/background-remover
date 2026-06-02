<script lang="ts">
	import type { Entry } from '$lib/types/entry.svelte';
	import { Trash2 } from '@lucide/svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
</script>

<div>
	<h2>Files</h2>
	<ul aria-label="Files">
		{#each entries as { id, file } (id)}
			<li>
				<p>{file.name}</p>
				<button
					onclick={() => (entries = entries.filter((f) => f.id !== id))}
					aria-label={`Remove ${file.name}`}
				>
					<Trash2 />
				</button>
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

		& button {
			/* Layout */
			display: grid;
			place-items: center;

			/* Appearance */
			color: var(--neutral-600);
			border: none;
			background: none;
			outline: none;
			border-radius: var(--radius-sm);

			/* Spacing */
			padding: var(--size-1) var(--size-2);

			/* Interaction */
			cursor: pointer;

			transition:
				background-color var(--transition-duration) ease-in-out,
				box-shadow var(--transition-duration) ease-in-out;

			& :global(.lucide) {
				width: var(--size-4);
			}

			&:hover,
			&:focus {
				background-color: var(--neutral-100);
				box-shadow: 0px 1px 1px 0px var(--neutral-200);
			}

			&:focus-visible {
				/* Outline styles for focus ring */
				outline: 2px solid var(--neutral-600);
				outline-offset: 1px;
			}
		}
	}
</style>
