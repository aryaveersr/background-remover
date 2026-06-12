<script lang="ts">
	import { Eraser } from '@lucide/svelte';
</script>

<header>
	<Eraser />
	<div>
		<nav>
			<a href="https://github.com/aryaveersr/background-remover">Github</a>
		</nav>
	</div>
</header>

<style>
	header {
		/* Fill row when on desktop. Has no effect on mobile */
		grid-column: 1 / -1;

		/* Appearance */
		background-color: white;
		border-bottom: 1px solid var(--neutral-200);

		/* Spacing */
		padding: 1rem 1.5rem;

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	a {
		/* Appearance */
		color: var(--neutral-700);
		text-decoration: none;
		border-radius: var(--radius-sm);

		/* Spacing */
		padding: 0.5rem 0.75rem;

		/* Interaction */
		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: var(--neutral-100);
		}

		&:focus-visible {
			outline: 2px solid var(--neutral-600);
			outline-offset: 1px;
		}
	}
</style>
