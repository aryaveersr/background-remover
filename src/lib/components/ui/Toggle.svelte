<script lang="ts">
	interface Props {
		initial?: boolean;
		onchange?: (value: boolean) => void;
	}

	let { initial = false, onchange = () => {} }: Props = $props();

	// svelte-ignore state_referenced_locally
	let on = $state(initial);
</script>

<label class:on>
	<input type="checkbox" class="visually-hidden" bind:checked={on} onchange={() => onchange(on)} />
	<span>
		{#if on}
			ON
		{:else}
			OFF
		{/if}
	</span>
</label>

<style>
	label {
		/* Size */
		width: 4rem;

		/* Appearance */
		background-color: var(--bg-muted);
		border-radius: var(--radius-md);

		/* Spacing */
		padding: 4px;

		/* Interaction */
		cursor: pointer;
		user-select: none;

		&.on {
			background-color: var(--primary-solid);
			color: var(--fg);
		}
	}

	span {
		display: block;

		/* Size */
		width: 2rem;
		font-size: var(--text-xs);

		/* Spacing */
		padding: 0.25rem;

		/* Appearance */
		background-color: var(--bg-surface);
		border-radius: var(--radius-md);
		text-align: center;

		.on & {
			background-color: var(--primary-contrast);
			transform: translateX(1.5rem);
		}
	}
</style>
