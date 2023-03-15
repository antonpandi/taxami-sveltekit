<script>
	import Nav from '../lib/components/Nav.svelte';
</script>

<main>
	<Nav />
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: 58em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	@media (min-width: 600px) {
		main {
			max-width: 80%;
		}
	}
</style>
