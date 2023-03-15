<script>
	import { onMount } from 'svelte';

	//Variables
	import { building_id } from '../../stores/building';
	let id;
	building_id.subscribe((i) => (id = i));

	let building,
		workers,
		workers_count,
		worker_email,
		assignment_title,
		assignment_description,
		assignment_priority,
		assignment_deadline,
		assignment_email;

	onMount(async () => {
		await fetch('https://Mini-axami.antonpandi.repl.co/find/building', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				id
			})
		})
			.then(async (res) => (building = await res.json()))
			.catch((err) => console.log(err));

		console.log(building);

		getWorkers();
	});

	const getWorkers = async () => {
		await fetch('https://Mini-axami.antonpandi.repl.co/workers/mine', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				building_id: id
			})
		})
			.then(async (res) => (workers = await res.json()))
			.catch((err) => console.log(err));

		workers_count = workers.length;

		console.log(workers);
		console.log(workers_count);
	};

	const addAssignment = () => {
		fetch('https://Mini-axami.antonpandi.repl.co/add/assignment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				assignment_title,
				assignment_description,
				assignment_email
			})
		})
			.then()
			.catch((err) => console.log(err));
	};

	const setPriority = (ev) => {
		assignment_priority = ev.target.value;
		console.log(assignment_priority);
	};

	const setDeadline = (ev) => {
		assignment_deadline = ev.target.value;
		console.log(assignment_deadline);
	};

	const linkWorker = (ev) => {
		let email = ev.target.worker_email;

		fetch('https://Mini-axami.antonpandi.repl.co/link/buildings', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				worker_email,
				building_id: building.id
			})
		})
			.then(getWorkers())
			.catch((err) => console.log(err));
	};
</script>

<h2>Building</h2>
{#if building}
	{#if workers_count > 0}
		<div class="building">
			<div class="adress building_attrubute">
				<h4 class="building_info">Adress:</h4>
				<p class="building_info">{building.adress}</p>
			</div>
			<div class="type building_attrubute">
				<h4 class="building_info">Building Type:</h4>
				<p class="building_info">{building.type}</p>
			</div>
		</div>
	{:else}
		<h4>No Workers Connected To The Building</h4>
	{/if}
{:else}
	Loading building...
{/if}

{#if workers}
	<div id="workers" class="container">
		<h3>Linked workers</h3>
		{#each workers as worker}
			<div class="worker">
				<h3>{worker.fname} {worker.lname}</h3>
				<p>{worker.email}</p>
			</div>
		{/each}
	</div>
{:else}
	<p>No workers found</p>
{/if}

<div class="createAssignment container">
	<form on:submit|preventDefault={addAssignment}>
		<h3>Create Assignment</h3>
		<h4>Title</h4>
		<input bind:value={assignment_title} type="text" name="title" placeholder="Title" />
		<h4>Description</h4>
		<input
			bind:value={assignment_description}
			type="text"
			name="description"
			placeholder="Description"
		/>
		<h4>Priorti</h4>
		<div class="radiomenu">
			<div class="radio">
				<p>High</p>
				<input on:click={setPriority} type="radio" name="priority" value="1" />
			</div>
			<div class="radio">
				<p>Low</p>
				<input on:click={setPriority} type="radio" name="priority" value="0" />
			</div>
		</div>
		<h4>Deadline</h4>
		<input on:input={setDeadline} type="date" name="date" id="" />
		<h4>Email</h4>
		<input bind:value={assignment_email} type="text" name="email" placeholder="Email" />
		<button type="submit">Add assignment</button>
	</form>
</div>

<div class="linkWorker container">
	<h3>Link worker</h3>
	<form>
		<h4>Email</h4>
		<input bind:value={worker_email} type="email" name="email" placeholder="email" />
		<button type="submit" on:click|preventDefault={linkWorker}>Link Worker</button>
	</form>
</div>

<style>
	.worker {
		display: flex;
		justify-content: space-evenly;
		background-color: #f9f9f9;
	}
	.container {
		border: 1px solid black;
		padding: 10px;
		margin: 5px;
	}
	.building_attrubute {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.building_info {
		margin: 6px;
	}
	.radio {
		margin: 2px;
	}
	.radiomenu {
		display: flex;
	}
</style>
