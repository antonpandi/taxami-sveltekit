<script>
	import { onMount } from 'svelte';
	import { building_id } from '../../stores/building';
	import { page } from '../../stores/page';

	let buildings;

	onMount(async () => {
		try {
			const response = await fetch('https://Mini-axami.antonpandi.repl.co/buildings/mine', {
				method: 'GET',
				credentials: 'include'
			});

			buildings = await response.json();

			console.log(buildings);
		} catch (error) {
			console.error(error);
		}
	});

	const selectBuilding = (id) => {
		page.set('building');
		building_id.set(id);
	};

	const removeBuilding = async (building) => {
		let text = `Are you sure you want to remove the building \n ${building.adress}`;
		if (confirm(text) == true) {
			let result = await fetch('https://Mini-axami.antonpandi.repl.co/remove/buildings', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(building)
			});
			console.log('Result: ', JSON.stringify(result));

			console.log('Building deleted: ', building);

			buildings = buildings.filter((b) => b.id != building.id);
		} else console.log('Deletion caceled');
	};
</script>

{#if buildings}
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
				<button class="btn" on:click={() => removeBuilding(building)}>X</button>
			</div>
		{/each}
	</div>
{:else}
	<h4>You have no registered buildings</h4>
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
</style>
