<script>
	import { goto } from '$app/navigation';
	import Nav from '../lib/components/Nav.svelte';
	import "../style.css"
	import {user} from "$lib/stores/user.js"
	import { onMount } from 'svelte';
	
	onMount(()=>{
		if(!$user){
			goto('/');
		}
	})



	
</script>

<Nav />
<main>
	<slot />
</main>

<!-- <style>
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
			max-width: 50%;
		}
	}
</style> -->
