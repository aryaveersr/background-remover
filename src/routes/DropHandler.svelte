<script lang="ts">
	import { supportedMimeTypes } from '$lib';
	import { Entry } from '$lib/entry.svelte';
	import { Plus } from '@lucide/svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
	let hovering = $state(false);
</script>

<svelte:window
	ondrop={(ev) => {
		ev.preventDefault();
		hovering = false;

		const images = [...ev.dataTransfer!.items]
			.filter((item) => item.kind === 'file')
			.filter((item) => supportedMimeTypes.includes(item.type));

		images.forEach((item) => entries.push(new Entry(item.getAsFile()!)));
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
			<span>
				<Plus />
			</span>
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

	span {
		/* Size */
		aspect-ratio: 1;
		font-size: 1.25rem;

		/* Appearance */
		background-color: var(--neutral-100);
		border-radius: 100%;

		/* Layout */
		display: flex;
		justify-content: center;
		align-items: center;

		/* Spacing */
		padding: 1rem;
	}
</style>
