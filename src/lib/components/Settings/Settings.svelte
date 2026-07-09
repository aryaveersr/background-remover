<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import Button from '../ui/Button.svelte';
	import { X } from '@lucide/svelte';
	import Toggle from '../ui/Toggle.svelte';
	let isOpen = $derived(page.url.searchParams.has('settings'));

	$effect(() => console.log(isOpen));
</script>

{#if isOpen}
	<div class="container" transition:fade={{ duration: 100 }}>
		<section>
			<header>
				<h3>Settings</h3>
				<Button kind="ghost" size="md" onclick={() => window.history.back()}>
					<X />
				</Button>
			</header>
			<div class="section">
				<h4>User Interface</h4>
				<ul>
					<li>
						<span>Color scheme</span>
						<Button kind="subtle">tEst</Button>
					</li>
					<li>
						<span>Auto download when done</span>
						<Toggle initial={false} onchange={(v) => console.log(v)} />
					</li>
				</ul>
			</div>
		</section>
	</div>
{/if}

<style>
	.container {
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

	section {
		/* Size */
		width: 90%;
		height: 80%;

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

	.section {
		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		padding: 1.25rem;
		gap: 1.5rem;
	}

	h4 {
		/* Font settings */
		font-weight: 400;
		font-size: var(--text-default);

		/* Layout (for underline) */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: 0.25rem;
	}

	h4::after {
		content: '';
		width: 50%;
		margin-right: auto;
		border-bottom: 1px solid var(--border);
	}

	ul {
		/* Reset styles */
		list-style: none;

		/* Layout */
		display: flex;
		flex-direction: column;

		/* Spacing */
		gap: 1rem;
	}

	li {
		/* Fill width */
		width: 100%;

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	li > span {
		width: 50%;
	}

	@media (min-width: 900px) {
		section {
			/* Overlay size */
			width: 75%;
			height: 75%;
		}

		.section {
			/* Spacing */
			padding: 4rem 8rem;
		}
	}
</style>
