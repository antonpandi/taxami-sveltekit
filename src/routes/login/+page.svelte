<script>
	import LoginClient from '../../lib/components/Login/LoginClient.svelte';
	import LoginWorker from '../../lib/components/Login/LoginWorker.svelte';
	import { page } from '$lib/stores/page';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import URL from "$lib/components/URL.js"

	onMount(()=> $page = "login")

	let loginSwitch = 'CLIENT';

	const setClient = () => (loginSwitch = 'CLIENT');
	const setWorker = () => (loginSwitch = 'WORKER');

		
	let email = '',
		password = '';
		
	const submitClient = async () => {
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
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
		
		goto('/');
	};




</script>
<div class="logo_container">
	<h1>Sign in</h1>
</div>
<br />
<div>
	<div class="login_type">
		<button class:selected={loginSwitch=='CLIENT'} on:click={setClient}>Client</button>
		<button class:selected={loginSwitch=='WORKER'} on:click={setWorker}>Worker</button>
	</div>
	<div class="container">
		<br>

		
		
		<form on:submit|preventDefault={submitClient}>
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
	.form_item>h4{
		text-align: left;
	}
	.login_type {
		padding: 0;
		display: flex;
		justify-content: left;
		max-width: 400px;
		
		
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