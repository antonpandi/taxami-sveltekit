<script>
	import LoginClient from '../../lib/components/Login/LoginClient.svelte';
	import LoginWorker from '../../lib/components/Login/LoginWorker.svelte';

	let loginSwitch = 'CLIENT';

	const setClient = () => (loginSwitch = 'CLIENT');
	const setWorker = () => (loginSwitch = 'WORKER');
</script>

<h1>Please Login</h1>
<hr />
<div class="flex_container">
	<button on:click={setClient}>Client</button>
	<button on:click={setWorker}>Worker</button>
</div>

{#if loginSwitch == 'CLIENT'}
	<LoginClient />
{:else}
	<LoginWorker />
{/if}

<style>
	button{
		width:100%
	}
</style>