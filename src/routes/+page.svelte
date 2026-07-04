<script lang="ts">
	import type { Entry } from '$lib/entry.svelte';
	import AddImages from './_partials/AddImages.svelte';
	import Header from './_partials/Header.svelte';
	import ListImages from './_partials/ListImages.svelte';

	let entries = $state<Entry[]>([]);
</script>

<div>
	<Header />
	<section>
		<AddImages bind:entries />
	</section>
	<section>
		<ListImages bind:entries />
	</section>
</div>

<style>
	div {
		/* Fill space */
		width: 100%;
		height: 100%;

		/* Layout (single column) */
		display: grid;
		grid-template-rows: min-content auto auto;
		grid-template-columns: 1fr;
	}

	@media (min-width: 900px) {
		div {
			/* Layout (side by side) */
			grid-template-rows: min-content minmax(0, 1fr);
			grid-template-columns: minmax(auto, 440px) 1fr;
		}
	}
</style>
