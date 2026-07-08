<script lang="ts">
	import { downloadEntry, type Entry } from '$lib/entry';
	import Button from '$lib/components/ui/Button.svelte';
	import { ArrowDownToLine, Trash2 } from '@lucide/svelte';
	import Progress from '$lib/components/ui/Progress.svelte';
	import { getEntries } from '$lib/entries.svelte';

	interface Props {
		entry: Entry;
	}

	let { entry }: Props = $props();
	let entries = getEntries();
</script>

<figure>
	<img
		src={entry.kind == 'processed' ? entry.out : entry.src}
		aria-labelledby="filename-{entry.id}"
		alt={entry.file.name}
	/>
	<figcaption>
		<p id="filename-{entry.id}" title={entry.file.name}>{entry.file.name}</p>
		{#if entry.kind == 'pending'}
			<Button kind="ghost" aria-label="Remove" title="Remove" onclick={() => entries.remove(entry)}>
				<Trash2 />
			</Button>
		{:else if entry.kind == 'processed'}
			<Button
				kind="ghost"
				onclick={() => downloadEntry(entry)}
				aria-label="Download"
				title="Download"
			>
				<ArrowDownToLine />
			</Button>
		{/if}
	</figcaption>
</figure>
<Progress
	aria-label="Upload progress"
	aria-hidden={entry.kind != 'processing'}
	value={entry.kind == 'processing' ? entry.progress : 0}
/>

<style>
	figcaption {
		/* Spacing */
		padding: 0.5rem 0.5rem 0.5rem 0.75rem;
		gap: 1rem;

		/* Layout */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	figcaption p {
		/* Wrap filename */
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	img {
		/* Fill space */
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 1;
	}
</style>
