<script lang="ts">
	import { setEntries, Entries, getEntries } from '$lib/entries.svelte';
	import { createEntry } from '$lib/entry';
	import { mimeTypes } from '$lib/utils/mime';
	import AddImages from './AddImages.svelte';
	import DropArea from './DropArea.svelte';
	import Header from './Header.svelte';
	import ListImages from './ListImages.svelte';

	setEntries(new Entries());

	let entries = getEntries();
</script>

<svelte:window
	onpaste={(ev) => {
		for (const item of ev.clipboardData!.items) {
			if (item.kind != 'file') continue;
			if (!mimeTypes.includes(item.type)) continue;

			entries.add(createEntry(item.getAsFile()!));
		}
	}}
/>

<div>
	<Header />
	<DropArea />

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
