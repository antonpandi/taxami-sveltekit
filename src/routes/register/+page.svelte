<script>
	import RegisterClient from '../../lib/components/Register/RegisterClient.svelte';
	import RegisterWorker from '../../lib/components/Register/RegisterWorker.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	// import { page } from '$lib/stores/page';
	import { onMount } from 'svelte';
	import {user} from "$lib/stores/user"
	import {authenticated} from "$lib/stores/auth"

	import URL from "$lib/components/URL"


	let registerSwitch = 'CLIENT';
	let registerType = 'CLIENT';

	const setClient = () => (registerSwitch = 'CLIENT');
	const setWorker = () => (registerSwitch = 'WORKER');

	let email, password, fname, lname;

	async function register(){
		console.log('Submit:', 'Email:', email, 'Password:', password);
		// await fetch(URL(registerSwitch == "CLIENT"?'register/client':'register/worker'), {
		await fetch(URL('register'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
				fname,
				lname,
				email: email.toLowerCase(),
				password,
				'role':registerSwitch
			})
		})
		.then((res) => res.json())
		.then((data) => {
			console.log("Response: ", data);
			// goto('/');
		})
		.catch((err) => console.log(err));
		
		
	};


</script>

<h1>Please Register</h1>


<div class="register-page page-box">
	<div class="login_type">
		<button class:selected={registerSwitch=='CLIENT'} on:click={setClient}>Client</button>
		<button class:selected={registerSwitch=='WORKER'} on:click={setWorker}>Worker</button>
	</div>
	<div>
		<br>

		
		
		<form class="register-form" on:submit|preventDefault={register}>
			<div class="form_item">
				<h4>First name:</h4>
				<input bind:value={fname} type="text" name="email" placeholder="Sven" />
			</div>
			<br />
			<div class="form_item">
				<h4>Last name:</h4>
				<input bind:value={lname} type="text" name="email" placeholder="Svensson" />
			</div>
			<br />
			<div class="form_item">
				<h4>Email:</h4>
				<input bind:value={email} type="email" name="email" placeholder="email@example.com" />
			</div>
			<br />
			{#if registerSwitch=='CLIENT'}
				<div class="form_item ">
					<h4>Password:</h4>
					<input bind:value={password} type="password" name="password" placeholder="Password" />
				</div>
				<br />
			{/if}
		
			<button type="submit"> Register </button>
		</form>
		
		<!-- {#if loginSwitch == 'CLIENT'}
			<LoginClient />
		{:else}
			<LoginWorker />
		{/if} -->
	</div>
</div>
<style>
	

	.register-page{
		padding: 0;
		display: block;
	}
	.register-form{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 10rem;
	}
	.flex_container{
		justify-content: center;
		align-items: center;
	}
</style>