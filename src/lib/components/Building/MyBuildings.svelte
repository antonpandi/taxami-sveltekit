<script>
	import { bind } from 'svelte/internal';
	import EditBuilding from './EditBuilding.svelte';
	import { onMount } from 'svelte';
	import Building from './Building.svelte';
	import { building_id } from '../../stores/building';
	import { page } from '../../stores/page';
	import { role } from '../../stores/role';
	import { user } from '../../stores/user';
	import URL from '$lib/components/URL.js'

	let buildings = getBuildings(), method, selected;

	// onMount(async () => {
	// });

	async function getBuildings(){
		try {
			console.log("trying to get buildings")
			const response = await fetch(URL('buildings/mine'), {
				method: 'GET',
				credentials: 'include'
			});

			return await response.json();

			console.log(buildings);

			
		} catch (error) {
			console.error(error);
		}
	}

	const selectBuilding = (id) => {
		page.set('building');
		building_id.set(id);
	};

	const removeBuilding = async (building) => {
		let text = `Are you sure you want to remove the building \n ${building.adress}`;
		if (confirm(text)) {
			console.log('Building deleted: ', building);
			
			const response = await fetch(URL('remove/buildings'), {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					building
				})
			});
			
			
			try{
				buildings.then((result) => { buildings = result.filter((r) => r.id != building.id)})
			}catch(error) {
				buildings = buildings.filter((r) => r.id != building.id)
				console.log(buildings)
			}finally{
				method = null
			}
			



		} else console.log('Deletion canceled');
	};
	const setBuilding = (temp) => {
		selected = temp;
		method = "Edit"
	};
</script>

{#if method == "Edit"}
	
	<EditBuilding bind:building={selected} bind:method />
{:else}
	{#await buildings}
		<p>Waiting on buildings...</p>
	{:then buildings} 
		<div id="buildings">
			{#each buildings as building}
				<div class="building_container container">
					<div class="building">
						<a
							href="/"
							on:click|preventDefault={() => {
								selectBuilding(building.id);
							}}
						>
							<h3 class="adress">{building.adress}</h3>
						</a>
						<p>{building.type}</p>
					</div>
					<div class="flex_container">
						{#if ($role == "CLIENT"  && building.client_id == user.id) || $role == "ADMIN"}
							<button on:click={() => setBuilding(building)} class="btn"> <i class="fa-solid fa-pen"></i> </button>
							<button on:click={() => removeBuilding(building)}  class="btn red" ><i class=" fa fa-trash"></i></button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}
{/if}



<style>
	.adress {
		cursor: pointer;
	}
	.adress:hover {
		text-decoration: underline;
	}
	.building {
		padding-left: 20px;
	}
	.building_container {
		border: 1px solid black;
		display: flex;
		justify-content: space-between;
	}

	.btn {
		width: 10%;
	}

	.flex_container {
		flex-direction: column;
	}
</style>
