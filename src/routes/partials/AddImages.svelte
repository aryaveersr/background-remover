<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { Entry } from '$lib/entry.svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
</script>

<form
	onsubmit={(ev) => {
		ev.preventDefault();
		entries.forEach((entry) => entry.upload());
	}}
>
	<h2>Upload images</h2>
	<FileUpload onupload={(file) => entries.push(new Entry(file))} />
	<Button type="submit" size="md" style="width: 100%" disabled={entries.length === 0}>
		Remove Background
	</Button>
</form>

<style>
	form {
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
		padding: 1rem;
		gap: 1rem;
	}

	h2 {
		/* Font */
		font-size: var(--text-lg);
		font-weight: 500;
	}
</style>
