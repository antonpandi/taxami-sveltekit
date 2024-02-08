<script>
	import LoginClient from '../../lib/components/Login/LoginClient.svelte';
	import LoginWorker from '../../lib/components/Login/LoginWorker.svelte';
	import { page } from '$lib/stores/page';
	import { onMount } from 'svelte';

	onMount(()=> $page = "login")

	let loginSwitch = 'CLIENT';

	const setClient = () => (loginSwitch = 'CLIENT');
	const setWorker = () => (loginSwitch = 'WORKER');
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
		
		{#if loginSwitch == 'CLIENT'}
			<LoginClient />
		{:else}
			<LoginWorker />
		{/if}
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