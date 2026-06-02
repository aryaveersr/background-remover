<script lang="ts">
	// Fonts
	import '@fontsource-variable/raleway/wght.css';

	// Stylesheets
	import '$lib/styles/tokens.css';
	import '$lib/styles/index.css';

	// Components
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<div>
	<Header />
	<main>
		{@render children()}
	</main>
</div>

<style>
	div {
		/* Constrain width */
		max-width: var(--size-192);
		margin: 0 auto;

		/* Layout */
		display: grid;
		grid-template-rows: auto 1fr;
	}

	main {
		/* Spacing */
		padding: var(--size-4);
	}
</style>
