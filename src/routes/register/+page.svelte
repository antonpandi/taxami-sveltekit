<script>
	import RegisterClient from '../../lib/components/Register/RegisterClient.svelte';
	import RegisterWorker from '../../lib/components/Register/RegisterWorker.svelte';
	import { page } from '$lib/stores/page';
	import { onMount } from 'svelte';

	onMount(()=> $page = "register")

	let registerSwitch = 'CLIENT';

	const setClient = () => (registerSwitch = 'CLIENT');
	const setWorker = () => (registerSwitch = 'WORKER');
</script>

<h1>Please Register</h1>
<div class="container">
	<button on:click={setClient}>Client</button>
	<button on:click={setWorker}>Worker</button>
	
	{#if registerSwitch == 'CLIENT'}
		<RegisterClient />
	{:else}
		<RegisterWorker />
	{/if}
</div>

<style>
	

	.flex_container{
		justify-content: center;
		align-items: center;
	}
</style>