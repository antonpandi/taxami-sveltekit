<script>
	import Assignment from '$lib/components/Assignment/Assignment.svelte';
	import { onMount } from "svelte";


    export let assignment, method, workers

    onMount(() => {
        console.log("Assignment", assignment);
        assignment.deadline_date = assignment.deadline.split('T')[0]
    })
	
    const confirmEdit = async () => { 
        assignment.deadline = assignment.deadline_date
        await fetch('https://Mini-axami.antonpandi.repl.co/edit/assignment', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				assignment: assignment,
				method: method
			})
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        method = "";
    }

    $: console.log("Assignment", assignment)
    

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

</script>


<div class="assignment"> 
	<h2>{method} Assignment</h2>
    <!-- <div class="btn container">
        <button on:click={()=>editAssignment(assignment)} class="btn">Edit</button>
        <button on:click={() => deleteAssignment(assignment)} class="btn">Delete</button>
	
    </div> -->
	{#if method == "Edit" || method == "Create"}
	<h3>{method} Assignment </h3>
		<h4>Title</h4>
		<input bind:value={assignment.title} type="text" name="title" placeholder="Title" /> 
		<h4>Description</h4>
		<input
			bind:value={assignment.description}
			type="text"
			name="description"
			placeholder="Description"
		/>
		<h4>Priority</h4>
		<div class="radiomenu">
			<div class="radio">
				<p>High</p>
				<input bind:group={assignment.priority} type="radio" name="priority" value={1} />
			</div>
			<div class="radio">
				<p>Low</p>
				<input bind:group={assignment.priority} type="radio" name="priority" value={0} />
			</div>
		</div>
		<h4>Deadline {assignment.deadline}</h4>
		<input bind:value={assignment.deadline_date} type="date" name="date" id="" />
		<h4>Email</h4>
		<select name="cars" id="cars">
			{#if workers}
			<option on:click={setAssignmentId} value={null} selected>No worker</option>
			{#each workers as worker}
					<option  on:click={setAssignmentId} value={worker.id} selected={worker.id == assignment.worker_id} >{worker.fname} {worker.lname}</option>
				{/each}
			{/if}
			
		</select>
		<hr>
		<div class="btn_container">
			{#if method == "Create"}
				<button type="submit">Add assignment</button>
			{:else if method == "Edit"}
				<button on:click={confirmEdit}> Confirm</button>
			{/if}
			<button on:click={() => method = ""}> Cancel</button>
		</div>
	{:else}
		<h4>{assignment.title}</h4>
		<br>
		<h4>{assignment.description}</h4>
		<hr>
		<h4>{assignment.deadline}</h4>
		{#if method == "Complete"}
			<h4>Total cost</h4>
			<input bind:value={assignment.total_cost} type="number" name="Total_cost" placeholder="Total Cost">
			<h4>Total Time</h4>
			<input bind:value={assignment.total_time} type="time" name="Total_time" placeholder="Total Time">
		{:else if method == "Take On Task"}
			<h4>Estimated Cost</h4>
			<input bind:value={assignment.estimated_cost} type="text" name="setAmount" placeholder="Amount"  />
			<h4>Estimated Time</h4>
			<input bind:value={assignment.estimated_time} type="time" name="setTime" placeholder="Time"  />
		{/if}
		<div class="btn container">
			<button on:click={confirmEdit} class="btn">{method}</button>
			<button on:click={()=> method = ""} class="btn">Cancel</button>
		</div>
	{/if}

</div>

<style>
	.assignment{
		padding: 1rem;
		border: 2px solid black;
	}
</style>