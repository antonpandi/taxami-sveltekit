<script>
	import { onMount } from 'svelte';
	import { authenticated} from '../lib/stores/auth';
	import { role } from '../lib/stores/role';

	//Components
	import Menu from '../lib/components/Menu/Menu.svelte';

	let message = '';
	let user;
	$: console.log(message);
	$: console.log(user);

	onMount(async () => {
		try {
			let res = await fetch('https://Mini-axami.antonpandi.repl.co/user', {
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			})
			user = await res.json();
			message = `${user.fname}  ${user.lname}`;

			if (user){
				$authenticated = true;
				$role = user.role;
			}
		}catch(error) {
			console.error(error, error.message);
			message = 'You are not authenticated';
			$authenticated = false;
			$role = null;
		}
	});
</script>

{#if $authenticated == true}
	<h4>Welcome back {message}! {$authenticated} {$role}</h4>
	<Menu />
{:else}
	<h2>Please login/register to continue</h2>
{/if}

<style>
</style>
