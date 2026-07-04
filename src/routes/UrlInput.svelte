<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Entry } from '$lib/entry.svelte';
	import { Plus } from '@lucide/svelte';

	interface Props {
		entries: Entry[];
	}

	let { entries = $bindable() }: Props = $props();
	let err = $state('');
</script>

<form
	onsubmit={async (ev) => {
		ev.preventDefault();

		const form = ev.currentTarget;
		const url = new FormData(form).get('url') as string;

		try {
			const entry = await Entry.fromUrl(url);
			entries.push(entry);
			form.reset();
			err = '';
		} catch (e) {
			console.error(e);
			err = (e as Error).message;
		}
	}}
>
	<label for="url-input">Add image from URL</label>
	<div>
		<Input
			type="url"
			name="url"
			id="url-input"
			placeholder="Enter URL here.."
			value=""
			style="width: 100%"
			required
			aria-describedby={err.length ? 'url-err' : undefined}
			aria-invalid={err.length ? true : undefined}
		/>
		<Button size="md" kind="subtle">
			<Plus />
		</Button>
	</div>
	{#if err.length}
		<span id="url-err" role="alert">{err}</span>
	{/if}
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

	span {
		display: block;

		/* Spacing */
		margin-left: 1px;
		margin-top: 0.5rem;
	}

	span {
		/* Appearance */
		color: var(--red-600);
	}
</style>
