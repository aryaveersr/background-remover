<script lang="ts">
	import { supportedMimeTypes } from '$lib';
	import { Entry } from '$lib/entry.svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
</script>

<svelte:window
	onpaste={(ev) => {
		for (const item of ev.clipboardData!.items) {
			if (item.kind != 'file') continue;
			if (!supportedMimeTypes.includes(item.type)) continue;
			entries.push(new Entry(item.getAsFile()!));
		}
	}}
/>
