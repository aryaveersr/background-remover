<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import { getEntries } from '$lib/entries.svelte';
	import { createEntry } from '$lib/entry';
	import { getImages } from '$lib/utils/image';
	import { Plus } from '@lucide/svelte';

	let entries = getEntries();
	let hovering = $state(false);
	let counter = 0;
</script>

<svelte:window
	ondragenter={(ev) => {
		if (getImages(ev.dataTransfer!).length == 0) return;
		counter++;
		hovering = true;
	}}
	ondragleave={(ev) => {
		if (getImages(ev.dataTransfer!).length == 0) return;
		counter--;
		if (counter == 0) hovering = false;
	}}
	ondragover={(ev) => {
		if (getImages(ev.dataTransfer!).length == 0) return;
		ev.preventDefault();
	}}
	ondrop={(ev) => {
		ev.preventDefault();
		hovering = false;
		counter = 0;

		getImages(ev.dataTransfer!)
			.map(createEntry)
			.forEach((file) => entries.add(file));
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
