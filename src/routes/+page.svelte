<script lang="ts">
	let progress = $state<number | null>(null);
	let src = $state<string | null>(null);

	function onsubmit(ev: SubmitEvent & { currentTarget: HTMLFormElement }) {
		ev.preventDefault();

		const form = new FormData(ev.currentTarget);
		const xhr = new XMLHttpRequest();

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

<form enctype="multipart/form-data" {onsubmit}>
	<input type="file" name="file" accept="image/png, image/jpeg" required />
	<button type="submit">Submit</button>
</form>

{#if progress}
	<progress value={progress} max="100"></progress>
{/if}

{#if src}
	<img {src} alt="Result" />
{/if}
