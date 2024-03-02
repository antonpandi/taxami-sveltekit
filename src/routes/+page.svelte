<script>
	import { onMount } from 'svelte';
	import { authenticated} from '../lib/stores/auth';
	import { role } from '../lib/stores/role';
	import { user } from '../lib/stores/user';
	import URL from '$lib/components/URL.js'

	//Components
	import Menu from '../lib/components/Menu/Menu.svelte';
	import { page } from '$app/stores';


	let message = '';
	$: console.log(message);
	$: console.log($user);



	// onMount(async () => {
	// 	try {
	// 		let res = await fetch(URL('user'), {
	// 			headers: { 'Content-Type': 'application/json' },
	// 			credentials: 'include'
	// 		})
	// 		$user = await res.json();	
	// 		message = `${$user.fname}  ${$user.lname}`;

	// 		if ($user){
	// 			$authenticated = true;
	// 			$role = $user.role;
	// 			// $page = "home"
	// 		}
	// 	}catch(error) {
	// 		console.error(error, error.message);
	// 		message = 'You are not authenticated';
	// 		$authenticated = false;
	// 		$role = null;
	// 	}
	// });
</script>

<h2>{$page.url.pathname}</h2>

<h1>Welcome to Taxami</h1>

<style>
	h2{
		margin: auto;
		text-align: center;
	}
</style>
