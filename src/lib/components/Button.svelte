<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children?: Snippet;
		icon?: boolean;
		size?: 'sm' | 'md';
		kind?: 'filled' | 'subtle';
		color?: 'neutral' | 'danger';
	}

	let {
		children,
		icon = false,
		size = 'sm',
		kind = 'filled',
		color = 'neutral',
		...props
	}: Merge<Props, HTMLButtonAttributes> = $props();
</script>

<button
	{...props}
	class="focus-ring"
	data-size={size}
	data-kind={kind}
	data-icon={icon}
	data-color={color}
>
	{@render children?.()}
</button>

<style>
	/* Color and kind variants */

	[data-color='neutral'] {
		&[data-kind='filled'] {
			--btn-bg: var(--neutral-800);
			--btn-color: var(--neutral-50);
			--btn-shadow-color: var(--neutral-400);

			--btn-hover-bg: var(--neutral-700);
			--btn-hover-shadow-color: var(--neutral-300);

			--btn-active-bg: var(--neutral-600);
			--btn-active-shadow-color: var(--neutral-400);
		}

		&[data-kind='subtle'] {
			--btn-bg: var(--neutral-100);
			--btn-color: var(--neutral-800);
			--btn-shadow-color: transparent;

			--btn-hover-bg: var(--neutral-200);
			--btn-hover-shadow-color: transparent;

			--btn-active-bg: var(--neutral-300);
			--btn-active-shadow-color: transparent;
		}
	}

	[data-color='danger'] {
		&[data-kind='filled'] {
			--btn-bg: var(--red-800);
			--btn-color: var(--red-50);
			--btn-shadow-color: var(--red-400);

			--btn-hover-bg: var(--red-700);
			--btn-hover-shadow-color: var(--red-300);

			--btn-active-bg: var(--red-600);
			--btn-active-shadow-color: var(--red-400);
		}

		&[data-kind='subtle'] {
			--btn-bg: var(--red-100);
			--btn-color: var(--red-800);
			--btn-shadow-color: transparent;

			--btn-hover-bg: var(--red-200);
			--btn-hover-shadow-color: transparent;

			--btn-active-bg: var(--red-300);
			--btn-active-shadow-color: transparent;
		}
	}

	/* Size and icon variants */

	[data-icon='false'] {
		&[data-size='sm'] {
			--btn-font-size: var(--text-sm);
			--btn-padding: 0.5rem 1rem;
		}

		&[data-size='md'] {
			--btn-font-size: var(--text-normal);
			--btn-padding: 0.75rem 1.5rem;
		}
	}

	[data-icon='true'] {
		&[data-size='sm'] {
			--btn-font-size: var(--text-sm);
			--btn-padding: 0.5rem;
		}

		&[data-size='md'] {
			--btn-font-size: var(--text-normal);
			--btn-padding: 0.75rem;
		}
	}

	/* Base styles */

	button {
		/* Border */
		border: none;
		border-radius: var(--radius-sm);

		/* Appearance */
		color: var(--btn-color);
		background-color: var(--btn-bg);
		box-shadow: 0px 1px 1px 1px var(--btn-shadow-color);

		/* Spacing */
		padding: var(--btn-padding);
		gap: var(--btn-font-size);

		/* Layout */
		display: inline-flex;
		align-items: center;
		justify-content: center;

		/* Interactions */
		cursor: pointer;
		transition: all var(--transition);

		/* Font  */
		font-size: var(--btn-font-size);

		&:hover,
		&:focus {
			background-color: var(--btn-hover-bg);
			box-shadow: 0px 0px 4px 1px var(--btn-hover-shadow-color);
		}

		&:active {
			background-color: var(--btn-active-bg);
			box-shadow: inset 0px 0px 2px 2px var(--btn-active-shadow-color);
		}

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
			box-shadow: none;
		}

		/* Icon */
		& :global(.lucide) {
			width: var(--btn-font-size);
			height: var(--btn-font-size);
		}
	}
</style>
