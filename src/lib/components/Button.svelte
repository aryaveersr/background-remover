<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children?: Snippet;
		icon?: Snippet;
		size?: 'sm' | 'md';
		theme?: 'filled' | 'subtle';
	}

	let {
		children,
		icon,
		size = 'sm',
		theme = 'filled',
		...props
	}: Merge<Props, HTMLButtonAttributes> = $props();
</script>

<button {...props} class="focus-ring" data-size={size} data-theme={theme}>
	{@render children?.()}
	{@render icon?.()}
</button>

<style>
	button {
		/* Border */
		border: none;
		border-radius: var(--radius-sm);

		/* Interactions */
		cursor: pointer;

		/* Font and icons */
		font-size: var(--btn-size);

		& :global(.lucide) {
			width: var(--btn-size);
			height: var(--btn-size);
			margin-bottom: 1px; /* Minor adjustment for alignment */
		}

		/* Spacing */
		gap: var(--btn-size);

		/* Layout */
		display: inline-flex;
		align-items: center;
		justify-content: center;

		transition:
			background-color var(--transition-duration) ease-in-out,
			box-shadow var(--transition-duration) ease-in-out,
			outline var(--transition-duration) ease-in-out;

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		/* Size Variants */

		&[data-size='sm'] {
			--btn-size: var(--text-sm);
			padding: 0.5rem 1rem;
		}

		&[data-size='md'] {
			--btn-size: var(--text-normal);
			padding: 0.75rem 1.5rem;
		}

		/* Theme variants */

		&[data-theme='filled'] {
			/* Colors */
			color: var(--neutral-50);
			background-color: var(--neutral-800);

			/* Shadow */
			box-shadow: 0px 1px 1px 1px var(--neutral-400);

			&:hover,
			&:focus {
				background-color: var(--neutral-700);
				box-shadow: 0px 0px 4px 1px var(--neutral-300);
			}

			&:active {
				background-color: var(--neutral-600);
				box-shadow: inset 0px 0px 2px 2px var(--neutral-400);
			}
		}
	}
</style>
