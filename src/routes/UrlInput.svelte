<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Entry, getEntries } from '$lib/entries.svelte';
	import { mimeTypes } from '$lib/utils/mime';
	import { Plus } from '@lucide/svelte';

	let entries = getEntries();
	let err = $state('');

	async function fetchUrl(url: string) {
		const filename = new URL(url).pathname.split('/').pop() || 'Image';
		const res = await fetch('/api/proxy', { headers: { 'X-Proxy-Url': url } });
		const blob = await res.blob();

		if (!res.ok) {
			throw new Error(`Error ${res.status} while fetching image: ${res.statusText}`);
		}

		if (!mimeTypes.includes(blob.type)) {
			throw new Error(`URL returned ${blob.type} instead of an image`);
		}

		return new File([blob], filename, {
			type: blob.type
		});
	}
</script>

<form
	onsubmit={async (ev) => {
		ev.preventDefault();
		const form = ev.currentTarget;
		const url = new FormData(form).get('url') as string;

		try {
			const file = await fetchUrl(url);

			entries.add(new Entry(file));
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
