<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import Button from '../ui/Button.svelte';
	import { X } from '@lucide/svelte';
	let isOpen = $derived(page.url.searchParams.has('settings'));

	$effect(() => console.log(isOpen));
</script>

{#if isOpen}
	<section transition:fade={{ duration: 100 }}>
		<div>
			<header>
				<h3>Settings</h3>
				<Button kind="ghost" size="md" onclick={() => window.history.back()}>
					<X />
				</Button>
			</header>
		</div>
	</section>
{/if}

<style>
	section {
		/* Cover the screen */
		position: absolute;
		z-index: 99;
		width: 100%;
		height: 100%;

		/* Appearance */
		background-color: var(--bg-overlay);

		/* Layout */
		display: grid;
		place-items: center;
	}

	div {
		/* Size */
		width: 75%;
		height: 75%;

		/* Appearance */
		background-color: var(--bg-surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
	}

	h3 {
		/* Font settings */
		font-weight: 400;
		font-size: var(--text-default);

		/* Spacing */
		padding: 0.5rem 1.25rem;
	}

	header {
		/* Layout */
		display: flex;
		justify-content: space-between;
		align-items: center;

		/* Appearance */
		border-bottom: 1px solid var(--border-muted);

		& :global(button) {
			border-radius: 0px;
			border-top-right-radius: var(--radius-lg);
		}
	}
</style>
