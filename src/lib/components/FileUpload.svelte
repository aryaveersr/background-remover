<script lang="ts">
	import type { Merge } from '$lib/utils/merge';
	import { Upload } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		onupload?: (file: File) => void;
		children?: Snippet;
	}

	let { onupload = () => {}, children, ...props }: Merge<Props, HTMLInputAttributes> = $props();
</script>

<label>
	<input
		type="file"
		class="visually-hidden"
		{...props}
		onchange={(ev) => {
			[...ev.currentTarget.files!].forEach(onupload);
			ev.currentTarget.value = '';
		}}
	/>
	<div>
		<span>
			<Upload />
		</span>
		<p>Click or drag and drop files here...</p>
		<small>{@render children?.()}</small>
	</div>
</label>

<style>
	div {
		/* Size */
		width: 100%;
		height: 16rem;

		/* Appearance */
		border-bottom: 3px solid var(--border-muted);
		background-color: var(--bg-subtle);

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
		background-color: var(--bg-muted);
		border-color: var(--border);
	}

	input:focus-visible + div {
		outline: 2px solid var(--border-emphasized);
		outline-offset: 2px;
	}

	span {
		/* Appearance */
		color: var(--fg-subtle);

		/* Spacing */
		margin-bottom: 0.5rem;
	}

	small {
		/* Appearance */
		color: var(--fg-light);

		/* Font */
		font-size: var(--text-sm);
	}
</style>
