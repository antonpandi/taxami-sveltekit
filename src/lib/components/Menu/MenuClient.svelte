<script>
	//Components
	import AddBuilding from '../Building/AddBuilding.svelte';
	import MyBuildings from '../Building/MyBuildings.svelte';
	import Building from '../Building/Building.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';

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
<div class="container">
	{#if $page == 'home'}
		<Profile />
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
</div>
