<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/ui/Button.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { Eraser, Settings } from '@lucide/svelte';
</script>

<header>
	<Eraser />
	<div>
		<nav>
			<a href="https://github.com/aryaveersr/background-remover">Github</a>
		</nav>
		<Button kind="ghost" onclick={() => goto(resolve('/?settings'))}>
			Settings <Settings />
		</Button>
		<ThemeToggle />
	</div>
</header>

<style>
	header {
		/* Fill row when on desktop. Has no effect on mobile */
		grid-column: 1 / -1;

		/* Appearance */
		background-color: var(--bg-surface);
		border-bottom: 1px solid var(--border-muted);

		/* Spacing */
		padding: 0.5rem 1.25rem;

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	div {
		/* Layout */
		display: flex;
		align-items: center;

		/* Spacing */
		gap: 1rem;
	}

	a {
		/* Appearance */
		color: var(--fg-muted);
		text-decoration: none;
		border-radius: var(--radius-md);
		font-size: var(--text-sm);

		/* Spacing */
		padding: 0.5rem 0.75rem;

		&:hover {
			background-color: var(--bg-subtle);
		}

		&:focus-visible {
			outline: 2px solid var(--border-emphasized);
			outline-offset: 1px;
		}
	}
</style>
