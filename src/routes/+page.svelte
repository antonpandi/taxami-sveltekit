<script>
	import { onMount } from 'svelte';
	import { authenticated} from '../lib/stores/auth';
	import { role } from '../lib/stores/role';
	import { user } from '../lib/stores/user';

	//Components
	import Menu from '../lib/components/Menu/Menu.svelte';
	import { page } from '../lib/stores/page';

	let message = '';
	$: console.log(message);
	$: console.log($user);

	onMount(async () => {
		try {
			let res = await fetch('https://Mini-axami.antonpandi.repl.co/user', {
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			})
			$user = await res.json();	
			message = `${$user.fname}  ${$user.lname}`;

			if ($user){
				$authenticated = true;
				$role = $user.role;
				$page = "home"
			}
		}catch(error) {
			console.error(error, error.message);
			message = 'You are not authenticated';
			$authenticated = false;
			$role = null;
		}
	});
</script>

{#if $authenticated}
	{#if $page == 'home'}
	<h2>Welcome back {message}!<!--  {$authenticated} {$role} --></h2>
	{/if}
	<Menu />
{:else}
	<h2>Please login/register to continue</h2>
{/if}

<style>
	h2{
		margin: auto;
		text-align: center;
	}
</style>
