<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Entry } from '$lib/entry.svelte';
	import { Plus } from '@lucide/svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
	let urlInput = $state('');

	async function onUrlInput() {
		const entry = await Entry.fromUrl(urlInput);
		entries.push(entry);
		urlInput = '';
	}
</script>

<svelte:window
	onpaste={(ev) => {
		for (const item of ev.clipboardData!.items) {
			if (item.kind != 'file') return;
			if (!['image/png', 'image/jpeg'].includes(item.type)) return;
			entries.push(new Entry(item.getAsFile()!));
		}
	}}
/>

<form
	onsubmit={(ev) => {
		ev.preventDefault();
		entries.forEach((entry) => entry.upload());
	}}
>
	<div class="top">
		<h2>Upload images</h2>
		<FileUpload onupload={(file) => entries.push(new Entry(file))} />

		<hr />

		<label for="url-input">Add image from URL</label>
		<div class="url">
			<Input
				bind:value={urlInput}
				id="url-input"
				placeholder="Paste URL here.."
				style="width: 100%"
				onkeydown={(ev) => {
					if (ev.key != 'Enter') return;
					ev.preventDefault();
					onUrlInput();
				}}
			/>
			<Button type="button" size="md" kind="subtle" onclick={onUrlInput}>
				<Plus />
			</Button>
		</div>

		<hr />

		<p>Or paste images directly from your clipboard.</p>
	</div>
	<div>
		<Button type="submit" size="md" style="width: 100%" disabled={entries.length === 0}>
			Remove Background
		</Button>
	</div>
</form>

<style>
	form {
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

	.url {
		/* Layout */
		display: flex;

		/* Spacing */
		gap: 0.5rem;
	}

	label {
		/* Spacing */
		margin-bottom: -0.25rem;
		margin-left: 1px;
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
		form {
			/* Take all space*/
			height: 100%;

			border-bottom: none;
			border-right: 1px solid var(--neutral-200);
		}
	}
</style>
