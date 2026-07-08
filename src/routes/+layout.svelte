<script lang="ts">
	// Fonts
	import '@fontsource-variable/raleway/wght.css';

	// Stylesheets
	import '$lib/styles/colors.css';
	import '$lib/styles/tokens.css';
	import '$lib/styles/index.css';

	let { children } = $props();
</script>

<div class="container">
	<div class="mask"></div>
	{@render children()}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}

	.container {
		/* Position .mask div behind content but in front of the container */
		position: relative;
		isolation: isolate;

		/* Background */
		background-color: var(--bg);
	}

	.mask {
		/* Cover background */
		position: absolute;
		z-index: -1;

		background-color: var(--border-muted);
		mask-image: url('/mask.svg');
	}
</style>
