<script lang="ts">
	import type { Entry, Status } from '$lib/entry.svelte';
	import AddImages from './partials/AddImages.svelte';
	import Header from './partials/Header.svelte';
	import ListImages from './partials/ListImages.svelte';
	import Placeholder from './partials/Placeholder.svelte';

	let entries = $state<Entry[]>([]);
	let status = $derived<Status>(
		entries.find((e) => e.status == 'processing')?.status ?? entries?.[0]?.status ?? 'unprocessed'
	);
</script>

<div data-status={status}>
	<Header />
	{#if status == 'unprocessed'}
		<section>
			<AddImages bind:entries />
		</section>
	{/if}
	<section data-empty={entries.length == 0}>
		{#if entries.length}
			<ListImages bind:entries {status} />
		{:else}
			<Placeholder />
		{/if}
	</section>
</div>

<style>
	div {
		/* Fill space */
		width: 100%;
		height: 100%;

		/* Spacing */
		padding: 1rem;
		gap: 1rem;

		/* Layout */
		display: grid;
		grid-template-rows: repeat(2, max-content);
		grid-template-columns: 1fr;
	}

	[data-empty='true'] {
		display: none;
	}

	@media (min-width: 800px) {
		div {
			grid-template-columns: minmax(auto, 480px) auto;
		}

		[data-empty='true'] {
			display: block;
		}
	}
</style>
