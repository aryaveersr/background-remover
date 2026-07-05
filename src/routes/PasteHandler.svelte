<script lang="ts">
	import { Entry, getEntries } from '$lib/entries.svelte';
	import { mimeTypes } from '$lib/utils/mime';

	let entries = getEntries();
</script>

<svelte:window
	onpaste={(ev) => {
		for (const item of ev.clipboardData!.items) {
			if (item.kind != 'file') continue;
			if (!mimeTypes.includes(item.type)) continue;

			entries.add(new Entry(item.getAsFile()!));
		}
	}}
/>
