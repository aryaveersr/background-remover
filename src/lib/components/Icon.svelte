<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<span>
	{@render children()}
</span>

<style>
	span {
		/* Size */
		aspect-ratio: 1;
		font-size: 1.25rem;

		/* Appearance */
		background-color: var(--bg-muted);
		border-radius: 100%;

		/* Layout */
		display: flex;
		justify-content: center;
		align-items: center;

		/* Spacing */
		padding: 1rem;
	}
</style>
