<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		children?: Snippet;
	}

	let { children, ...props }: Merge<Props, HTMLButtonAttributes> = $props();
</script>

<button {...props}>
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
</style>
