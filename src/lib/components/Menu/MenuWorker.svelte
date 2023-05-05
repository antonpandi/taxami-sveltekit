<script>
	//Components
	import MyBuildings from '../Building/MyBuildings.svelte';
	import AvailableAssignments from '../Assignment/AvailableAssignments.svelte';
	import MyAssignments from '../Assignment/MyAssignments.svelte';


	//Variables
	import { page } from '../../stores/page';

	const buildings = () => {
		page.set('my_buildings');
		console.log('Page set to: ', $page);
	};
	const availableAssignments = () => {
		page.set('available_jobs');
		console.log('Page set to: ', $page);
	};
	const myAssignments = () => {
		page.set('my_jobs');
		console.log('Page set to: ', $page);
	}
</script>


{#if $page == 'home'}
	<div id="menu">
		<button on:click={buildings}>Buildings</button>
		<button on:click={availableAssignments}>Available Jobs</button>
		<button on:click={myAssignments}>My Jobs</button>
	</div>
{/if}

{#if $page == 'my_buildings'}
	<MyBuildings />
{/if}

{#if $page == 'available_jobs'}
	<AvailableAssignments />
{/if}

{#if $page == 'my_jobs'}
	<MyAssignments />
{/if}
