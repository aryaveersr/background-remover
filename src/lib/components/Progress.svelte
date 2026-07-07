<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import type { AriaAttributes } from 'svelte/elements';

	interface Props {
		value?: number;
	}

	let { value, ...props }: Merge<Props, AriaAttributes> = $props();
</script>

<div role="progressbar" aria-valuenow={value} {...props}>
	<span style:width="{value}%"></span>
</div>

<style>
	div {
		/* Position */
		position: relative;

		/* Size */
		height: 0.25rem;
		width: 100%;
	}

	span {
		/* Position */
		position: absolute;

		/* Size */
		height: 100%;

		/* Apperance */
		background-color: var(--fg-subtle);
	}
</style>
