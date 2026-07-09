<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children?: Snippet;
		size?: 'sm' | 'md';
		kind?: 'filled' | 'outline' | 'subtle' | 'ghost';
		color?: 'primary' | 'neutral';
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

	[data-color='primary'] {
		&[data-kind='filled'] {
			--btn-color: var(--primary-contrast);

			--btn-bg: var(--primary-solid);
			--btn-hover-bg: color-mix(in srgb, var(--primary-solid) 90%, transparent);
			--btn-active-bg: color-mix(in srgb, var(--primary-solid) 80%, transparent);
		}

		&[data-kind='subtle'] {
			--btn-color: var(--neutral-800);

			--btn-bg: var(--primary-subtle);
			--btn-hover-bg: var(--primary-muted);
			--btn-active-bg: var(--primary-emphasized);
		}
	}

	[data-color='neutral'] {
		&[data-kind='subtle'] {
			--btn-color: var(--fg-muted);

			--btn-bg: var(--bg-subtle);
			--btn-hover-bg: var(--bg-muted);
			--btn-active-bg: var(--bg-emphasized);
		}

		&[data-kind='ghost'] {
			--btn-color: var(--fg);

			--btn-bg: transparent;
			--btn-hover-bg: var(--bg-muted);
			--btn-active-bg: var(--bg-emphasized);
		}
	}

	/* Size variant */

	[data-size='sm'] {
		--btn-font-size: var(--text-sm);
		--btn-padding: 0.5rem 0.625rem;
	}

	[data-size='md'] {
		--btn-font-size: var(--text-default);
		--btn-padding: 0.75rem 0.875rem;
	}

	/* Base styles */

	button {
		/* Appearance */
		border: none;
		color: var(--btn-color);
		background-color: var(--btn-bg);
		border-radius: var(--radius-md);

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
			outline: 2px solid var(--border-emphasized);
			outline-offset: 1px;
		}
	}
</style>
