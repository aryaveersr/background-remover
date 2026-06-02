<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { Trash2 } from '@lucide/svelte';

	let idCounter = 0;
	let files = $state<{ id: number; file: File; progress: number | null }[]>([
		// { id: 0, file: { name: 'example1.png' } as unknown as File, progress: null },
		// { id: 1, file: { name: 'example2.png' } as unknown as File, progress: 25 },
		// { id: 2, file: { name: 'example3.png' } as unknown as File, progress: 50 },
		// { id: 3, file: { name: 'example4.png' } as unknown as File, progress: 75 },
		// { id: 4, file: { name: 'example5.png' } as unknown as File, progress: 100 }
	]);

	function onsubmit(ev: SubmitEvent) {
		ev.preventDefault();

		for (const file of files) {
			const xhr = new XMLHttpRequest();
			const form = new FormData();

			form.set('file', file.file);

			xhr.upload.addEventListener('loadstart', () => {
				file.progress = 0;
			});

			xhr.upload.addEventListener('progress', (ev) => {
				if (ev.lengthComputable && file.progress != null) {
					file.progress = Math.round((ev.loaded / ev.total) * 100);
				}
			});

			xhr.upload.addEventListener('load', () => {
				file.progress = null;
			});

			xhr.addEventListener('load', () => {
				const src = URL.createObjectURL(xhr.response);

				const a = document.createElement('a');
				a.href = src;
				a.download = 'result.png';
				a.click();
			});

			xhr.responseType = 'blob';
			xhr.open('POST', '/');
			xhr.send(form);
		}
	}
</script>

<div class="container">
	{#if files.length > 0}
		<div class="filelist">
			<h2>Files</h2>
			<ul aria-label="File list">
				{#each files as { id, file } (id)}
					<li>
						<p>{file.name}</p>
						<button
							onclick={() => (files = files.filter((f) => f.id !== id))}
							aria-label={`Remove ${file.name}`}
						>
							<Trash2 />
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<form {onsubmit}>
		<FileUpload onupload={(file) => files.push({ id: idCounter++, file, progress: null })} />
		<Button type="submit" size="md" style="width: 100%">Submit</Button>
	</form>
</div>

<!-- {#if src}
	<img {src} alt="Result" />
{/if}{#if progress}
					<progress value={progress} max="100"></progress>
				{/if}
-->

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

	.filelist {
		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: var(--size-2);
	}

	.filelist h2 {
		/* Appearance */
		color: var(--neutral-700);

		/* Spacing (align with items) */
		padding-left: var(--size-2);

		/* Font */
		font-size: var(--text-normal);
	}

	ul {
		/* Reset styles */
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		/* Appearance */
		border-top: 1px solid var(--neutral-300);

		/* Spacing */
		padding: var(--size-2);

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;

		&:last-child {
			border-bottom: 1px solid var(--neutral-300);
		}

		& button {
			/* Layout */
			display: grid;
			place-items: center;

			/* Appearance */
			color: var(--neutral-600);
			border: none;
			background: none;
			outline: none;
			border-radius: var(--radius-sm);

			/* Spacing */
			padding: var(--size-1) var(--size-2);

			/* Interaction */
			cursor: pointer;

			transition:
				background-color var(--transition-duration) ease-in-out,
				box-shadow var(--transition-duration) ease-in-out;

			& :global(.lucide) {
				width: var(--size-4);
			}

			&:hover,
			&:focus {
				background-color: var(--neutral-100);
				box-shadow: 0px 1px 1px 0px var(--neutral-200);
			}

			&:focus-visible {
				/* Outline styles for focus ring */
				outline: 2px solid var(--neutral-600);
				outline-offset: 1px;
			}
		}
	}
</style>
