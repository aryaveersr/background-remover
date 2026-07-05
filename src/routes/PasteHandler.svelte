<script lang="ts">
	import { getEntries } from '$lib/entries.svelte';
	import { createEntry } from '$lib/entry';
	import { mimeTypes } from '$lib/utils/mime';

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
