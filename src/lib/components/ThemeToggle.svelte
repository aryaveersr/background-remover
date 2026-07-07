<script>
	import { Moon, Sun } from '@lucide/svelte';
	import Button from './Button.svelte';
	import { onMount } from 'svelte';

	let theme = $state('dark');

	onMount(() => {
		const saved = localStorage?.getItem('theme');
		const preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

		if (saved && ['light', 'dark'].includes(saved)) theme = saved;
		else theme = preference;

		if (theme == 'dark') document.documentElement.classList.add('dark');
	});

	function toggleTheme() {
		theme = theme == 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme);

		if (theme == 'dark') document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
	}
</script>

<Button
	kind="ghost"
	size="md"
	onclick={toggleTheme}
	style="border-radius: var(--radius-full); aspect-ratio: 1 / 1;"
>
	{#if theme == 'light'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</Button>
