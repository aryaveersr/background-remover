<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		value?: string;
	}

	let { value = $bindable(), ...props }: Merge<Props, HTMLInputAttributes> = $props();
</script>

<input bind:value type="text" {...props} />

<style>
	input {
		/* Appearance */
		border: 2px solid transparent;
		border-bottom: 3px solid var(--neutral-200);
		color: var(--neutral-800);
		background-color: var(--neutral-50);
		border-radius: var(--radius-sm);

		/* Font */
		font-size: var(--text-md);

		/* Spacing */
		padding: 0.75rem 0.875rem;
		gap: var(--text-md);

		/* Layout */
		display: inline-flex;
		align-items: center;
		justify-content: center;

		/* Interactions */
		cursor: text;
		transition:
			background-color 0.2s ease-in-out,
			border-color 0.2s ease-in-out;

		&:hover,
		&:focus {
			background-color: var(--neutral-100);
		}

		&:active {
			background-color: var(--neutral-200);
		}

		&:disabled {
			opacity: 0.25;
			pointer-events: none;
		}

		&:focus-visible {
			outline: none;
			border-color: var(--neutral-600);
		}
	}
</style>
