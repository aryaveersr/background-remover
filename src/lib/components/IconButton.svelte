<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children?: Snippet;
		color?: 'neutral' | 'danger';
	}

	let { children, color = 'neutral', ...props }: Merge<Props, HTMLButtonAttributes> = $props();
</script>

<button {...props} class="focus-ring" data-color={color}>
	{@render children?.()}
</button>

<style>
	button {
		/* Layout */
		display: grid;
		place-items: center;

		/* Appearance */
		color: var(--neutral-600);
		border: none;
		background: none;
		outline: none;
		border-radius: var(--radius-sm);

		/* Interaction */
		cursor: pointer;
		transition: all var(--transition-duration) ease-in-out;

		padding: 0.25rem 0.5rem;

		& :global(.lucide) {
			width: 1rem;
		}

		/* Color Varaints */

		&[data-color='neutral'] {
			&:hover,
			&:focus {
				background-color: var(--neutral-100);
				box-shadow: 0px 1px 1px 0px var(--neutral-200);
			}
		}

		&[data-color='danger'] {
			&:hover,
			&:focus {
				background-color: var(--red-100);
				box-shadow: 0px 1px 1px 0px var(--red-200);
				color: var(--red-600);
			}
		}
	}
</style>
