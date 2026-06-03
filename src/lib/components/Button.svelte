<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children?: Snippet;
		icon?: Snippet;
		size?: 'sm' | 'md';
	}

	let { children, icon, size = 'sm', ...props }: Merge<Props, HTMLButtonAttributes> = $props();
</script>

<button {...props} class={[`size-${size}`]}>
	{@render children?.()}
	{@render icon?.()}
</button>

<style>
	button {
		/* Colors */
		color: var(--neutral-50);
		background-color: var(--neutral-800);

		/* Border */
		border: none;
		border-radius: var(--radius-sm);

		/* Shadow */
		box-shadow: 0px 1px 1px 1px var(--neutral-400);

		/* Interactions */
		cursor: pointer;

		/* Layout */
		display: inline-flex;
		align-items: center;
		justify-content: center;

		transition:
			background-color var(--transition-duration) ease-in-out,
			box-shadow var(--transition-duration) ease-in-out,
			outline var(--transition-duration) ease-in-out;

		&:hover,
		&:focus {
			background-color: var(--neutral-700);
			box-shadow: 0px 0px 4px 1px var(--neutral-300);
		}

		&:focus-visible {
			/* Outline styles for focus ring */
			outline: 2px solid var(--neutral-600);
			outline-offset: 1px;
		}

		&:active {
			background-color: var(--neutral-600);
			box-shadow: inset 0px 0px 2px 2px var(--neutral-400);
		}

		/* Size Variants */

		&.size-sm {
			font-size: var(--text-sm);
			padding: var(--size-2) var(--size-4);
			gap: var(--size-2);

			& :global(.lucide) {
				width: var(--size-3);
			}
		}

		&.size-md {
			font-size: var(--text-normal);
			padding: var(--size-3) var(--size-6);
			gap: var(--size-4);

			& :global(.lucide) {
				width: var(--size-4);
			}
		}

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
</style>
