<script lang="ts">
	// Fonts
	import '@fontsource-variable/raleway/wght.css';

	// Stylesheets
	import '$lib/styles/colors.css';
	import '$lib/styles/tokens.css';
	import '$lib/styles/index.css';

	let { children } = $props();
</script>

{@render children()}
