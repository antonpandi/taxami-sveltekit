<script>
	//Components
	import Building from '$lib/components/Building/Building.svelte';
	import Assignment  from '$lib/components/Assignment/Assignment.svelte';
	import EditAssignment from './../Assignment/EditAssignment.svelte';
	import ClientAssignment from '$lib/components/Assignment/ClientAssignment.svelte';
	import { onMount } from 'svelte';

	//Variables
	import { building_id } from '../../stores/building';
	import { each } from 'svelte/internal';
	import { role } from '../../stores/role';

	let method, task;


	$: console.log("Workers: ", workers)
	$: console.log("Assignments: ", assignments)

	let id;
	building_id.subscribe((i) => (id = i));

	let workers = getWorkers(),
	assignments = getAssignments(),
	linkCheck = false;

	let building,
		worker_email,
		assignment_title,
		assignment_description,
		assignment_priority, 
		assignment_deadline,
		assignment_estimated_time,
		assignment_estimated_cost,
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

	});

	async function getWorkers(){
		let response = await fetch('https://Mini-axami.antonpandi.repl.co/workers/mine', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				building_id: id
			})
		})
		try {
				let result = await response.json()
				console.log(result)
				return result;
		} catch (error) {
			console.log(error)
		}
	};
	async function getAssignments(){
		let response = await fetch('https://Mini-axami.antonpandi.repl.co/assignments/building', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				building_id: id
			})
		})

		try {
				let result = await response.json()
				console.log(result)
				return result;
		} catch (error) {
			console.log(error)
		}

	}

	const addAssignment = () => {
		fetch('https://Mini-axami.antonpandi.repl.co/add/assignment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				building_id : building.id,
				assignment_title,
				assignment_description,
				assignment_email,
				assignment_priority,
				assignment_deadline,
				assignment_estimated_time,
				assignment_estimated_cost,

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
	const setAmount = (ev) => {
		assignment_estimated_cost = ev.target.value;
		console.log(assignment_estimated_cost);
	};
	const setTime = (ev) => {
		assignment_estimated_time = ev.target.value;
		console.log(assignment_estimated_time);
	};
	
	const setAssignmentId = (ev) => {
		let el = ev.target;
		let id = el.value;
		assignment_email = el.value;
		console.log(assignment_email);
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

	const createAssignment = () => {
		method = "Create";
		task = {building_id:building.id}
	}
</script>

<h2>Building</h2>
<!-- {#await }
	
{:then } 
	{#each || [] as }
		
	{:else}
	{/each}
	{:catch error}
	<p>{error.message}</p>
{/await} -->

{#if building}
	<div class="building container">
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
	Loading building...
{/if}
{#if method}
	<EditAssignment bind:assignment={task} bind:method bind:workers bind:assignments/>
{:else}
	{#await workers}
		<p>Waiting on buildings...</p>
	{:then workers} 
		<div id="workers" class="container">
					{#if linkCheck}
						<div class="linkWorker container">
							<h3>Link worker</h3>
							<form>
								<h4>Email</h4>
								<input bind:value={worker_email} type="email" name="email" placeholder="email" />
								<hr>
								<div class="flex_container">
									<button class="btn" type="submit" on:click|preventDefault={linkWorker}>Link Worker</button>
									<button class="btn red" on:click={() => linkCheck = false}>Cancel</button>
								</div>
							</form>
						</div>
					{:else}
						<div class="flex_container">
							<h3>Linked workers</h3>
							<button on:click={() => linkCheck = true}>Link worker</button>
						</div>
						{#each workers || [] as worker}
							<div class="worker container">
								<h3>{worker.fname} {worker.lname}</h3>
								<p>{worker.email}</p>
							</div>
						{:else}
						<p>There are no workers linked to this building</p>
						{/each}
					{/if}
		</div>
	{:catch error}
		<p>{error.message}</p>
	{/await}


<div class="container">
	<button on:click={createAssignment}>Add Assignment</button>
	{#await assignments}
		<p>Waiting on assignments</p>
	{:then assignments} 
	<div class="assignments">
		{#each assignments || [] as assignment}
			<Assignment bind:assignment bind:method bind:task/>
		{:else}
			<p>There are no assignments available for this building</p>
		{/each}
	</div>
		{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
{/if}
<!-- 
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
		<h4>Priority</h4>
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
		<h4>Estimated Cost</h4>
		<input on:input={setAmount} type="text" name="setAmount" placeholder="Amount"  />
		<h4>Estimated Time</h4>
		<input on:input={setTime} type="text" name="setTime" placeholder="Time"  />
		<h4>Email</h4>
		<select name="cars" id="cars">
			{#if workers}
				{#each workers as worker}
					<option on:click={setAssignmentId} value={worker.id}>{worker.fname} {worker.lname}</option>
				{/each}
			{/if}
			<option on:click={setAssignmentId} value={null}>No worker</option>
			
		</select>
		<button type="submit">Add assignment</button>
	</form>
</div>

 -->

<style>
	.worker {
		display: flex;
		justify-content: space-evenly;
		background-color: var(--gray);
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
