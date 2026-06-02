<script lang="ts">
	interface Props {
		progress?: number;
	}

	let { progress = 0 }: Props = $props();
</script>

<div class="container">
	<span>
		{progress}%
	</span>
	<div
		class="progress"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100"
		aria-valuenow={progress}
		style="--progress:{progress}%"
	></div>
</div>

<style>
	.container {
		/* Layout */
		display: flex;
		align-items: center;

		/* Spacing */
		gap: var(--size-2);
	}

	span {
		/* Font */
		font-family: monospace;
		font-size: var(--text-sm);
	}

	div.progress {
		/* Size */
		width: var(--size-4);
		height: var(--size-4);

		/* Circular Progress */
		border-radius: 50%;
		background:
			radial-gradient(closest-side, white 69%, transparent 70% 100%),
			conic-gradient(var(--neutral-900) var(--progress), var(--neutral-300) 0);
	}
</style>
