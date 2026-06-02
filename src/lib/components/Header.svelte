<script lang="ts">
	import { Eraser } from '@lucide/svelte';
</script>

<div class="container">
	<header>
		<span>
			<Eraser />
		</span>
		<div>
			<nav>
				<a href="https://github.com/aryaveersr">Github</a>
			</nav>
		</div>
	</header>
</div>

<style>
	.container {
		/* Spacing */
		padding: var(--size-4);
	}

	header {
		/* Appearance */
		background-color: white;
		border-radius: var(--radius-md);
		box-shadow:
			0px 0px 8px 2px var(--neutral-100),
			0px 1px 2px 0px var(--neutral-300);

		/* Spacing */
		padding: var(--size-3) var(--size-4);

		/* Layout */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	span {
		/* Wrap the icon without affecting the layout */
		display: contents;

		/* Appearance */
		color: var(--neutral-700);
	}

	a {
		/* Appearance */
		color: var(--neutral-700);
		text-decoration: none;
	}
</style>
