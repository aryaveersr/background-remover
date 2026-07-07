<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { Eraser } from '@lucide/svelte';
</script>

<header>
	<Eraser />
	<div>
		<nav>
			<a href="https://github.com/aryaveersr/background-remover">Github</a>
		</nav>
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
		padding: 1rem 1.5rem;

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

		/* Spacing */
		padding: 0.5rem 0.75rem;

		/* Interaction */
		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: var(--bg-subtle);
		}

		&:focus-visible {
			outline: 2px solid var(--border-emphasized);
			outline-offset: 1px;
		}
	}
</style>
