<script lang="ts">
	import type { Entry } from '$lib/entry.svelte';
	import AddImages from './partials/AddImages.svelte';
	import Header from './partials/Header.svelte';
	import ListImages from './partials/ListImages.svelte';

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

		/* Layout (single column on mobile) */
		display: grid;
		grid-template-rows: min-content auto auto;
		grid-template-columns: 1fr;
	}
</style>
