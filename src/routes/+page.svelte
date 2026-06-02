<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';

	let files = $state<File[]>([]);
	let progress = $state<number | null>(null);
	let src = $state<string | null>(null);

	function onsubmit(ev: SubmitEvent) {
		ev.preventDefault();

		const xhr = new XMLHttpRequest();
		const form = new FormData();

		form.set('file', files[0]);

		xhr.upload.addEventListener('loadstart', () => {
			progress = 0;
		});

		xhr.upload.addEventListener('progress', (ev) => {
			if (ev.lengthComputable && progress != null) {
				progress = Math.round((ev.loaded / ev.total) * 100);
			}
		});

		xhr.upload.addEventListener('load', () => {
			progress = null;
		});

		xhr.addEventListener('load', () => {
			src = URL.createObjectURL(xhr.response);

			const a = document.createElement('a');
			a.href = src;
			a.download = 'result.png';
			a.click();
		});

		xhr.responseType = 'blob';
		xhr.open('POST', '/');
		xhr.send(form);
	}
</script>

<form {onsubmit}>
	<FileUpload accept="image/png, image/jpeg" onupload={(f) => files.push(f)} />
	<Button type="submit" size="md" style="width: 100%">Submit</Button>
</form>

{#each files as file, index (index)}
	<p>{file.name}</p>
{/each}

{#if progress}
	<progress value={progress} max="100"></progress>
{/if}

{#if src}
	<img {src} alt="Result" />
{/if}

<style>
	form {
		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: 1rem;
	}
</style>
