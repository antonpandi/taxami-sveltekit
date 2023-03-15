<script>
	import { onMount } from 'svelte';

	//Variables
	import { building_id } from '../../stores/building';
	let id;
	building_id.subscribe((i) => (id = i));

	let building,
		assignments,
		workers,
		workers_count,
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

		getWorkers();
		getAssignments();
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

		console.log('Linked workers: ', workers);
		console.log(workers_count);
	};
	const getAssignments = async () => {
		await fetch('https://Mini-axami.antonpandi.repl.co/assignments/building', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				building_id: id
			})
		})
			.then(async (res) => (assignments = await res.json()))
			.catch((err) => console.log(err));
		console.log('Assignments: ', assignments);
	};

	const addAssignment = async () => {
		let new_assignment = {
			building_id: id,
			assignment_title,
			assignment_description,
			assignment_priority,
			assignment_deadline,
			assignment_estimated_time,
			assignment_estimated_cost,
			assignment_email
		};

		await fetch('https://Mini-axami.antonpandi.repl.co/add/assignment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(new_assignment)
		})
			.then(getAssignments())
			.catch((err) => console.log(err));
	};

	const removeAssignment = async (assignment) => {
		let text = `Are you sure you want to remove the assignment \n ${assignment.title}?`;
		if (confirm(text) == true) {
			let result = await fetch('https://Mini-axami.antonpandi.repl.co/remove/assignment', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(assignment)
			});
			console.log('Result: ', JSON.stringify(result));

			console.log('Assigment deleted: ', assignment);

			assignments = assignments.filter((b) => b.id != assignment.id);
		} else console.log('Deletion caceled');
	};

	const setPriority = (ev) => {
		assignment_priority = ev.target.value;
		console.log(assignment_priority);
	};

	const setDeadline = (ev) => {
		assignment_deadline = ev.target.value;
		console.log(assignment_deadline);
	};

	const linkWorker = async (ev) => {
		let email = ev.target.worker_email;

		await fetch('https://Mini-axami.antonpandi.repl.co/link/buildings', {
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
			<div class="worker post">
				<h3>{worker.fname} {worker.lname}</h3>
				<p>{worker.email}</p>
			</div>
		{/each}
	</div>
{:else}
	<p>No workers found</p>
{/if}

<div class="createAssignment container">
	<form on:submit|preventDefault={addAssignment} class="post">
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
		<h4>Estimated Time</h4>
		<input
			bind:value={assignment_estimated_time}
			type="text"
			name="estimated_time"
			placeholder="Estimated Time"
		/>
		<h4>Estimated Cost</h4>
		<input
			bind:value={assignment_estimated_cost}
			type="text"
			name="estimated_cost"
			placeholder="Estimated Cost"
		/>
		<h4>Email</h4>
		<input bind:value={assignment_email} type="text" name="email" placeholder="Email" />
		<button type="submit">Add assignment</button>
	</form>
</div>

<div class="linkWorker container">
	<h3>Link worker</h3>
	<form class="post">
		<h4>Email</h4>
		<input bind:value={worker_email} type="email" name="email" placeholder="email" />
		<button type="submit" on:click|preventDefault={linkWorker}>Link Worker</button>
	</form>
</div>
{#if assignments}
	<div class="assignemnts container">
		{#each assignments as assignment}
			<div class="assignment post assignment_container">
				<div class="info ">
					<h3>{assignment.title}</h3>
					<p>{assignment.description}</p>
					<p>{assignment.priority}</p>
					<p>{assignment.deadline}</p>
					<p>{assignment.estimated_time}</p>
					<p>{assignment.estimated_cost}</p>
					<p>{assignment.email}</p>
				</div>
				<button class="btn" on:click={() => removeAssignment(assignment)}>X</button>
			</div>
		{/each}
	</div>
{:else}
	<p>No assignments found</p>
{/if}

<style>
	.worker {
		display: flex;
		justify-content: space-evenly;
	}
	.container {
		border: 1px solid black;
		padding: 10px;
		margin: 5px;
	}
	.post {
		background-color: #f2f2f2;
		margin: 1em;
		padding: 1.2em;
	}
	.assignment_container {
		border: 1px solid black;
		display: flex;
		justify-content: space-between;
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
	.btn {
		width: 2.5rem;
		height: 2.5rem;
		background-color: lightgray;
	}
</style>
