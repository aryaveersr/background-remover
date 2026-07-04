<script lang="ts">
	import { supportedExtensions, supportedMimeTypes } from '$lib';
	import { Upload } from '@lucide/svelte';

	interface Props {
		onupload?: (file: File) => void;
	}

	let { onupload = () => {} }: Props = $props();
</script>

<label>
	<input
		type="file"
		class="visually-hidden"
		accept={supportedMimeTypes.join(', ')}
		multiple
		onchange={(ev) => {
			[...ev.currentTarget.files!].forEach(onupload);
			ev.currentTarget.value = '';
		}}
	/>
	<div>
		<span>
			<Upload />
		</span>
		<p>Click or drag and drop images here...</p>
		<small>{supportedExtensions} supported</small>
	</div>
</label>

<style>
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
	}

	input:focus + div,
	div:hover {
		background-color: var(--neutral-100);
		border-color: var(--neutral-300);
	}

	input:focus-visible + div {
		outline: 2px solid var(--neutral-600);
		outline-offset: 2px;
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
