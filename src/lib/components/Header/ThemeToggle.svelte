<script>
	import { Moon, Sun } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';

	function toggleTheme() {
		const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
		localStorage.setItem('theme', theme);

		if (theme == 'dark') document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
	}
</script>

<svelte:head>
	<script>
		const saved = localStorage?.getItem('theme');
		const preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

		let theme;

		if (saved && ['light', 'dark'].includes(saved)) theme = saved;
		else theme = preference;

		if (theme == 'dark') document.documentElement.classList.add('dark');
	</script>
</svelte:head>

<Button
	kind="ghost"
	size="md"
	onclick={toggleTheme}
	style="border-radius: var(--radius-full); aspect-ratio: 1 / 1;"
>
	<span class="light">
		<Sun />
	</span>
	<span class="dark">
		<Moon />
	</span>
</Button>

<style>
	span.light {
		display: contents;
	}

	span.dark {
		display: none;
	}

	:global(html.dark) {
		span.light {
			display: none;
		}

		span.dark {
			display: contents;
		}
	}
</style>
