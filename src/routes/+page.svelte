<script>
	import { onMount } from 'svelte';
	import { authenticated, userRole } from '../lib/stores/auth';

	//Components
	import Menu from '../lib/components/Menu/Menu.svelte';

	let message = '';

	onMount(async () => {
		try {
			const response = await fetch('https://Mini-axami.antonpandi.repl.co/user', {
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			console.log('Response: ', response);
			const content = await response.json();
			console.log('Content: ', content);

			message = `${content.fname}  ${content.lname}`;

			if (content.email) authenticated.set(true);
			if (content.role) userRole.set(content.role);
		} catch (error) {
			console.error(error);
			message = 'You are not authenticated';
			authenticated.set(false);
		}
	});
</script>

{#if $authenticated == true}
	<h4>Welcome back {message}! {$authenticated} {$userRole}</h4>
	<Menu />
{:else}
	<h2>Please login/register to continue</h2>
{/if}

<style>
</style>
