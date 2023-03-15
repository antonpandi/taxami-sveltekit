<script>
	import RegisterClient from '../../lib/components/Register/RegisterClient.svelte';
	import RegisterWorker from '../../lib/components/Register/RegisterWorker.svelte';

	let registerSwitch = 'CLIENT';

	const setClient = () => (registerSwitch = 'CLIENT');
	const setWorker = () => (registerSwitch = 'WORKER');
</script>

<h1>Please Register</h1>

<button on:click={setClient}>Client</button>
<button on:click={setWorker}>Worker</button>

{#if registerSwitch == 'CLIENT'}
	<RegisterClient />
{:else}
	<RegisterWorker />
{/if}
