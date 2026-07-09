<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	let isOpen = $derived(page.url.searchParams.has('settings'));

	$effect(() => console.log(isOpen));
</script>

{#if isOpen}
	<section transition:fade={{ duration: 100 }}>
		<div>
			<p>Hello, world!</p>
		</div>
	</section>
{/if}

<style>
	section {
		/* Cover the screen */
		position: absolute;
		z-index: 99;
		width: 100%;
		height: 100%;

		/* Appearance */
		background-color: var(--bg-overlay);

		/* Layout */
		display: grid;
		place-items: center;
	}

	div {
		/* Size */
		width: 75%;
		height: 75%;

		/* Appearance */
		background-color: var(--bg-surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
	}
</style>
