<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { Entry, getEntries } from '$lib/entries.svelte';
	import { mimeTypes } from '$lib/utils/mime';
	import { Plus } from '@lucide/svelte';

	let entries = getEntries();
	let hovering = $state(false);
</script>

<svelte:window
	ondrop={(ev) => {
		ev.preventDefault();
		hovering = false;

		const images = [...ev.dataTransfer!.items]
			.filter((item) => item.kind === 'file')
			.filter((item) => mimeTypes.includes(item.type));

		images.forEach((item) => entries.add(new Entry(item.getAsFile()!)));
		ev.dataTransfer!.dropEffect = images.length ? 'copy' : 'none';
	}}
	ondragover={(ev) => {
		if ([...ev.dataTransfer!.items].every((i) => i.kind !== 'file')) return;
		ev.preventDefault();
		hovering = true;
	}}
	ondragend={() => (hovering = false)}
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
		background-color: rgba(0, 0, 0, 0.5);

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
		background-color: white;
		opacity: 1;

		/* Spacing */
		gap: 1.25rem;
	}
</style>
