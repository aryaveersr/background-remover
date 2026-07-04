<script lang="ts">
	import type { Merge } from '$lib';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children?: Snippet;
		size?: 'sm' | 'md';
		kind?: 'filled' | 'subtle' | 'ghost';
		color?: 'neutral';
	}

	let {
		children,
		size = 'sm',
		kind = 'filled',
		color = 'neutral',
		...props
	}: Merge<Props, HTMLButtonAttributes> = $props();
</script>

<button {...props} data-size={size} data-kind={kind} data-color={color}>
	{@render children?.()}
</button>

<style>
	/* Color and kind variants */

	[data-color='neutral'] {
		&[data-kind='filled'] {
			--btn-color: var(--neutral-50);

			--btn-bg: var(--neutral-800);
			--btn-hover-bg: var(--neutral-700);
			--btn-active-bg: var(--neutral-600);
		}

		&[data-kind='subtle'] {
			--btn-color: var(--neutral-800);

			--btn-bg: var(--neutral-100);
			--btn-hover-bg: var(--neutral-200);
			--btn-active-bg: var(--neutral-300);
		}

		&[data-kind='ghost'] {
			--btn-color: var(--neutral-800);

			--btn-bg: transparent;
			--btn-hover-bg: var(--neutral-200);
			--btn-active-bg: var(--neutral-300);
		}
	}

	/* Size variant */

	[data-size='sm'] {
		--btn-font-size: var(--text-sm);
		--btn-padding: 0.5rem 0.625rem;
	}

	[data-size='md'] {
		--btn-font-size: var(--text-md);
		--btn-padding: 0.75rem 0.875rem;
	}

	/* Base styles */

	button {
		/* Appearance */
		border: none;
		color: var(--btn-color);
		background-color: var(--btn-bg);

		/* Font */
		font-size: var(--btn-font-size);

		/* Spacing */
		padding: var(--btn-padding);
		gap: var(--btn-font-size);

		/* Layout */
		display: inline-flex;
		align-items: center;
		justify-content: center;

		/* Interactions */
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;

		&:hover,
		&:focus {
			background-color: var(--btn-hover-bg);
		}

		&:active {
			background-color: var(--btn-active-bg);
		}

		&:disabled {
			opacity: 0.25;
			pointer-events: none;
		}

		&:focus-visible {
			outline: 2px solid var(--neutral-600);
			outline-offset: 1px;
		}
	}
</style>
