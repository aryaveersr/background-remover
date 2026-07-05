<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { Entry, getEntries } from '$lib/entries.svelte';
	import { extensions, mimeTypes } from '$lib/utils/mime';
	import UrlInput from './UrlInput.svelte';

	let entries = getEntries();
</script>

<div class="container">
	<div class="top">
		<h2>Upload images</h2>
		<FileUpload
			onupload={(file) => entries.add(new Entry(file))}
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
		style="width: 100%"
		disabled={entries.isEmpty()}
		onclick={() => entries.upload()}
	>
		Remove Background
	</Button>
</div>

<style>
	.container {
		/* Appearance */
		background-color: white;
		border-bottom: 1px solid var(--neutral-200);

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
		border-top: 2px dotted var(--neutral-300);

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
		.container {
			/* Take all space*/
			height: 100%;

			border-bottom: none;
			border-right: 1px solid var(--neutral-200);
		}
	}
</style>
