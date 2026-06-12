<script lang="ts">
	import { Upload } from '@lucide/svelte';

	interface Props {
		onupload?: (file: File) => void;
	}

	let { onupload = () => {} }: Props = $props();
	let label: HTMLLabelElement;

	function ondrop(ev: DragEvent) {
		const files = [...ev.dataTransfer!.items].filter((item) => item.kind === 'file');
		if (files.length > 0) {
			ev.preventDefault();
			const filteredFiles = files.filter((item) => item.type.startsWith('image/'));
			if (filteredFiles.length > 0) {
				ev.dataTransfer!.dropEffect = 'copy';
				filteredFiles.forEach((item) => onupload(item.getAsFile()!));
			} else {
				ev.dataTransfer!.dropEffect = 'none';
			}
		}
	}
</script>

<svelte:window
	ondrop={(ev) => {
		if ([...ev.dataTransfer!.items].some((item) => item.kind === 'file')) {
			ev.preventDefault();
		}
	}}
	ondragover={(ev) => {
		if ([...ev.dataTransfer!.items].some((item) => item.kind === 'file')) {
			ev.preventDefault();
			if (!label.contains(ev.target as Node)) {
				ev.dataTransfer!.dropEffect = 'none';
			}
		}
	}}
/>

<label bind:this={label} {ondrop}>
	<div role="button" tabindex="0">
		<span>
			<Upload />
		</span>
		<p>Click or drag and drop images here...</p>
		<small>.png,.jpg supported</small>
	</div>
	<input
		type="file"
		accept="image/png, image/jpeg"
		multiple
		onchange={(ev) => {
			[...ev.currentTarget.files!].forEach(onupload);
			ev.currentTarget.value = '';
		}}
	/>
</label>

<style>
	input {
		/* Hide the input */
		display: none;
	}

	div {
		/* Size */
		width: 100%;
		height: 16rem;

		/* Appearance */
		border-bottom: 3px solid var(--neutral-200);
		background-color: var(--neutral-50);

		/* Layout */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;

		/* Spacing */
		padding: 0.75rem;

		/* Interaction */
		cursor: pointer;
		transition:
			background-color 0.2s ease-in-out,
			border-color 0.2s ease-in-out;

		&:hover,
		&:focus {
			background-color: var(--neutral-100);
			border-color: var(--neutral-300);
		}

		&:focus-visible {
			outline: 2px solid var(--neutral-600);
			outline-offset: 2px;
		}
	}

	span {
		/* Appearance */
		color: var(--neutral-600);

		/* Spacing */
		margin-bottom: 0.5rem;
	}

	small {
		/* Appearance */
		color: var(--neutral-500);

		/* Font */
		font-size: var(--text-sm);
	}
</style>
