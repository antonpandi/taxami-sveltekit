<script>
	import LoginClient from '../../lib/components/Login/LoginClient.svelte';
	import LoginWorker from '../../lib/components/Login/LoginWorker.svelte';

	import { authenticated} from '$lib/stores/auth';
	import { role } from '$lib/stores/role';
	import { user } from '$lib/stores/user';

	import { page } from '$app/stores';
	// import { page } from '$lib/stores/page';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import URL from "$lib/components/URL.js"


	let loginSwitch = 'CLIENT';

	const setClient = () => (loginSwitch = 'CLIENT');
	const setWorker = () => (loginSwitch = 'WORKER');

		
	let email = '',
		password = '';
		
	async function login(){
		console.log('Submit:', 'Email:', email, 'Password:', password);
		await fetch(URL(loginSwitch == "CLIENT"?'login/client':'login/worker'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
				email,
				password,
				'role':loginSwitch
			})
		})
		.then((res) => res.json())
		.then((data) => {
			console.log("Response: ", data)
			console.log("User: ", data.user)
			$user = data.user;
			$authenticated = true;
			// $role = $user.role;
		})
		.catch((err) => console.log(err));
		
		goto('/');
	};




</script>
<div class="logo_container">
	<h1>Sign in</h1>
</div>
<br />
<div class="login-page page-box">
	<div class="login_type">
		<button class:selected={loginSwitch=='CLIENT'} on:click={setClient}>Client</button>
		<button class:selected={loginSwitch=='WORKER'} on:click={setWorker}>Worker</button>
	</div>
	<div>
		<br>

		
		
		<form class="login-form" on:submit|preventDefault={login}>
			<div class="form_item">
				<h4>Email:</h4>
				<input bind:value={email} type="email" name="email" placeholder="Email" />
			</div>
			<br />
			{#if loginSwitch=='CLIENT'}
				<div class="form_item ">
					<h4>Password:</h4>
					<input bind:value={password} type="password" name="password" placeholder="Password" />
				</div>
				<br />
			{/if}
		
			<button type="submit"> Login </button>
		</form>
		
		<!-- {#if loginSwitch == 'CLIENT'}
			<LoginClient />
		{:else}
			<LoginWorker />
		{/if} -->
	</div>
</div>

<style>
	.login-page{
		padding: 0;
		display: block;
	}
	.login-form{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 10rem;
	}
	.form_item>h4{
		text-align: left;
	}
	.login_type {
		padding: 0;
		display: flex;
		justify-content: left;
		
		
	}
	.logo_container{
		display: grid;
		justify-content:center;
		text-align: center;

	}
	.container{
		margin: 0
	}
	
</style>