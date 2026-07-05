<script lang="ts">
	import { setEntries, Entries } from '$lib/entries.svelte';
	import AddImages from './AddImages.svelte';
	import DropHandler from './DropHandler.svelte';
	import Header from './Header.svelte';
	import ListImages from './ListImages.svelte';
	import PasteHandler from './PasteHandler.svelte';

	setEntries(new Entries());
</script>

<div>
	<Header />

	<DropHandler />
	<PasteHandler />

	<section>
		<AddImages />
	</section>
	<section>
		<ListImages />
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
