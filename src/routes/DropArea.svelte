<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { getEntries } from '$lib/entries.svelte';
	import { createEntry } from '$lib/entry';
	import { mimeTypes } from '$lib/utils/mime';
	import { Plus } from '@lucide/svelte';

	let entries = getEntries();
	let hovering = $state(false);
	let counter = 0;
</script>

<svelte:window
	ondragenter={(ev) => {
		if ([...ev.dataTransfer!.items].every((i) => i.kind !== 'file')) return;
		counter++;
		hovering = true;
	}}
	ondragleave={(ev) => {
		if ([...ev.dataTransfer!.items].every((i) => i.kind !== 'file')) return;
		counter--;
		if (counter == 0) hovering = false;
	}}
	ondragover={(ev) => {
		if ([...ev.dataTransfer!.items].every((i) => i.kind !== 'file')) return;
		ev.preventDefault();
	}}
	ondrop={(ev) => {
		ev.preventDefault();
		hovering = false;
		counter = 0;

		const images = [...ev.dataTransfer!.items]
			.filter((item) => item.kind === 'file')
			.filter((item) => mimeTypes.includes(item.type));

		images.forEach((item) => entries.add(createEntry(item.getAsFile()!)));
	}}
/>

{#if hovering}
	<section>
		<div>
			<Icon>
				<Plus />
			</Icon>
			<p>Drop the file anywhere to import.</p>
		</div>
	</section>
{/if}

<style>
	section {
		/* Cover the screen */
		position: absolute;
		z-index: 99;
		width: 100%;
		height: 100%;

		/* Appearance */
		background-color: var(--bg-overlay);

		/* Layout */
		display: grid;
		place-items: center;
	}

	div {
		/* Size */
		width: 50%;
		height: 50%;

		/* Layout */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		/* Appearance */
		background-color: var(--bg-surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);

		/* Spacing */
		gap: 1.25rem;
	}
</style>
