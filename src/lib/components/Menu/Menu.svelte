<script>
	import MenuClient from './MenuClient.svelte';
	import MenuWorker from './MenuWorker.svelte';

	import { role } from '../../stores/role';

</script>

	{#if $role == 'ADMIN' || $role == 'CLIENT'}
		<MenuClient />
	{:else if $role == 'WORKER'}
		<MenuWorker />
	{/if}

<style>
	.menu{
		background-color: darkblue;
	}
</style>