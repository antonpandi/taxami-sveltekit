<script>
	import MenuClient from './MenuClient.svelte';
	import MenuWorker from './MenuWorker.svelte';

	import { userRole } from '../../stores/auth';

	let role = '';

	userRole.subscribe((r) => (role = r));
</script>

{#if role == 'ADMIN' || role == 'CLIENT'}
	<MenuClient />
{:else if role == 'WORKER'}
	<MenuWorker />
{/if}
