<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		value?: string;
	}

	let {
		value = $bindable(),
		type = 'text',
		...props
	}: Merge<Props, HTMLInputAttributes> = $props();
</script>

<input bind:value {type} {...props} />

<style>
	input {
		/* Appearance */
		border: 2px solid transparent;
		border-bottom: 2px solid var(--border-muted);
		color: var(--fg);
		background-color: var(--bg-subtle);
		border-radius: var(--radius-md);

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

		&:hover,
		&:focus {
			background-color: var(--bg-muted);
		}

		&:active {
			background-color: var(--bg-emphasized);
		}

		&:disabled {
			opacity: 0.25;
			pointer-events: none;
		}

		&:focus-visible {
			outline: none;
			border-color: var(--border-emphasized);
		}

		&:user-invalid {
			border-color: var(--border-error);
		}
	}
</style>
