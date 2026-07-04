<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Entry } from '$lib/entry.svelte';
	import { Plus } from '@lucide/svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
</script>

<form
	onsubmit={async (ev) => {
		const form = ev.currentTarget;
		const url = new FormData(form).get('url') as string;

		const entry = await Entry.fromUrl(url);
		entries.push(entry);

		form.reset();
	}}
>
	<label for="url-input">Add image from URL</label>
	<div>
		<Input name="url" id="url-input" placeholder="Paste URL here.." style="width: 100%" />
		<Button size="md" kind="subtle">
			<Plus />
		</Button>
	</div>
</form>

<style>
	div {
		/* Layout */
		display: flex;

		/* Spacing */
		gap: 0.5rem;
	}

	label {
		display: block;

		/* Spacing */
		margin-left: 1px;
		margin-bottom: 0.5rem;
	}
</style>
