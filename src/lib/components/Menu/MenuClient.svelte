<script>
	//Components
	import AddBuilding from '../Building/AddBuilding.svelte';
	import MyBuildings from '../Building/MyBuildings.svelte';
	import Building from '../Building/Building.svelte';

	//Variables
	import { page } from '../../stores/page';

	const myBuildings = () => {
		page.set('my_buildings');
		console.log('Page set to: ', $page);
	};
	const addbuilding = () => {
		page.set('add_building');
		console.log('Page set to: ', $page);
	};
</script>

{#if $page == 'home'}
	<div id="menu">
		<button on:click={myBuildings}>My Buildings</button>
		<button on:click={addbuilding}>Add New Building</button>
	</div>

{/if}

{#if $page == 'my_buildings'}
	<MyBuildings />
{/if}

{#if $page == 'add_building'}
	<AddBuilding />
{/if}

{#if $page == 'building'}
	<Building />
{/if}
