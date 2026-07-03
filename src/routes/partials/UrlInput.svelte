<script lang="ts">
	import Button from '$lib/components/Button.svelte';
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

<style>
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
</style>
