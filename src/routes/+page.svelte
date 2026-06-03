<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import EntryList from '$lib/components/EntryList.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { Entry } from '$lib/types/entry.svelte';
	import { ArrowDownToLine } from '@lucide/svelte';

	let status = $state<'waiting' | 'submitted'>('waiting');
	let entries = $state<Entry[]>([]);

	function onsubmit(ev: SubmitEvent) {
		ev.preventDefault();

		for (const entry of entries) {
			const xhr = new XMLHttpRequest();
			const form = new FormData();

			form.set('file', entry.file);
			entry.status = 'uploading';

			xhr.upload.addEventListener('progress', (ev) => {
				if (ev.lengthComputable && entry.status == 'uploading') {
					entry.progress = Math.round((ev.loaded / ev.total) * 100);
				}
			});

			xhr.upload.addEventListener('load', () => (entry.status = 'processing'));
			xhr.addEventListener('load', () => entry.onSuccess(xhr.response));

			xhr.responseType = 'blob';
			xhr.open('POST', '/');
			xhr.send(form);
		}

		status = 'submitted';
	}
</script>

<div class="container">
	{#if entries.length > 0}
		<EntryList {entries} />
	{/if}
	{#if status === 'waiting'}
		<form {onsubmit}>
			<FileUpload onupload={(file) => entries.push(new Entry(file))} />
			<Button type="submit" size="md" style="width: 100%" disabled={entries.length === 0}>
				Submit
			</Button>
		</form>
	{/if}
	{#if entries.length > 0 && entries.every((entry) => entry.status === 'success')}
		<Button size="md" style="width: 100%">
			Download All
			<ArrowDownToLine style="" />
		</Button>
	{/if}
</div>

<style>
	.container {
		/* Appearance */
		background-color: white;
		border-radius: var(--radius-md);
		box-shadow:
			0px 0px 8px 2px var(--neutral-100),
			0px 1px 2px 0px var(--neutral-300);

		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		padding: var(--size-8);
		gap: var(--size-8);
	}

	form {
		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: var(--size-8);
	}
</style>
