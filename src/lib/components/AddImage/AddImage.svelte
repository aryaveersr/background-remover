<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import FileUpload from '$lib/components/ui/FileUpload.svelte';
	import { getEntries } from '$lib/entries.svelte';
	import { createEntry } from '$lib/entry';
	import { extensions, mimeTypes } from '$lib/utils/image';
	import UrlInput from './UrlInput.svelte';

	let entries = getEntries();
</script>

<section>
	<div class="top">
		<h2>Upload images</h2>

		<FileUpload
			onupload={(file) => entries.add(createEntry(file))}
			accept={mimeTypes.join(', ')}
			multiple
		>
			{extensions} supported
		</FileUpload>

		<hr />
		<UrlInput />
		<hr />

		<p>Or paste images directly from your clipboard.</p>
	</div>
	<Button
		size="md"
		color="primary"
		style="width: 100%"
		disabled={entries.all.every((entry) => entry.kind != 'base')}
		onclick={() => entries.upload()}
	>
		Remove Background
	</Button>
</section>

<style>
	section {
		/* Appearance */
		background-color: var(--bg-surface);
		border-bottom: 1px solid var(--border-muted);

		/* Layout */
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		/* Spacing */
		padding: 1rem;
		gap: 1rem;
	}

	.top {
		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: 1rem;
	}

	hr {
		/* Appearance */
		border: none;
		border-top: 2px dotted var(--border);

		/* Spacing */
		margin: 1rem;
		margin-bottom: 0.5rem;
	}

	h2 {
		/* Font */
		font-size: var(--text-lg);
		font-weight: 500;
	}

	@media (min-width: 900px) {
		section {
			border-bottom: none;
			border-right: 1px solid var(--border-muted);
		}
	}
</style>
