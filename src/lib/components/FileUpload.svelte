<script lang="ts">
	import { Upload } from '@lucide/svelte';

	interface Props {
		onupload?: (file: File) => void;
		accept?: string;
	}

	let { onupload = () => {}, accept }: Props = $props();
	let label: HTMLLabelElement;

	function onchange(ev: Event & { currentTarget: HTMLInputElement }) {
		if (ev.currentTarget.files?.[0]) {
			onupload(ev.currentTarget.files[0]);
			ev.currentTarget.value = '';
		}
	}

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
		<p class="subtle">.png,.jpg supported</p>
	</div>
	<input type="file" {onchange} {accept} />
</label>

<style>
	input {
		/* Hide the input */
		display: none;
	}

	div {
		/* Size */
		width: 100%;
		min-height: var(--size-64);

		/* Appearance */
		border-radius: var(--radius-md);
		border: 1.5px dashed var(--neutral-300);
		background-color: var(--neutral-50);

		/* Layout */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		/* Interaction */
		cursor: pointer;

		transition: background-color var(--transition-duration) ease-in-out;

		&:hover,
		&:focus {
			background-color: var(--neutral-100);
		}

		&:focus-visible {
			/* Outline styles for focus ring */
			outline: 2px solid var(--neutral-400);
			outline-offset: 2px;
		}
	}

	span {
		/* Size */
		width: 1rem;
		height: 1rem;

		/* Margin */
		margin-bottom: var(--size-6);

		/* Appearance */
		color: var(--neutral-600);
	}

	p.subtle {
		/* Appearance */
		color: var(--neutral-500);
		font-size: var(--text-sm);
	}
</style>
