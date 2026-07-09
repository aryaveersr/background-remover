<script lang="ts">
	import { setEntries, Entries, getEntries } from '$lib/entries.svelte';
	import { createEntry } from '$lib/entry';
	import { getImages } from '$lib/utils/image';
	import { Header } from '$lib/components/Header';
	import { AddImage } from '$lib/components/AddImage/';
	import { ImageList } from '$lib/components/ImageList';
	import { Settings } from '$lib/components/Settings';
	import DropArea from '$lib/components/DropArea.svelte';
	import { setSettings, Settings as SettingsClass } from '$lib/settings';

	let settings = new SettingsClass();

	setSettings(settings);
	setEntries(new Entries(settings));

	let entries = getEntries();
</script>

<svelte:window
	onpaste={(ev) => {
		getImages(ev.clipboardData!)
			.map(createEntry)
			.forEach((file) => entries.add(file));
	}}
/>

<div>
	<Header />
	<DropArea />
	<AddImage />
	<ImageList />
	<Settings />
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
