
<script>
	import EditAssignment from "./EditAssignment.svelte";

    export let assignment, assignments, workers
    
	let assignmentClass = "",
    method = "";
    const setCompleted = () => {assignmentClass = "container completed"}
    const setUncompleted = () => {assignmentClass = "container uncompleted"}
    const setDeadline = () => {assignmentClass = "container deadline"}
    const setUnassigned = () => {assignmentClass = "container unassigned"}

    const deadlineMeet = () => {
        let date = new Date();
        let deadline = new Date(assignment.deadline)
        return date >= deadline;
    }

    const setClassName = () => {
        if(assignment.completed)setCompleted()
        else if(assignment.worker_id)setUncompleted()
        else if(deadlineMeet()) setDeadline()
        else setUnassigned()
    }

    const editAssignment = (job) => {
        method = "Edit";
    }
    const deleteAssignment = async (job) => {
        let option = confirm(`Are you sure you want to delete this assignment? ${assignment.title}`)
        console.log(option)
        if(option){
            await fetch('https://Mini-axami.antonpandi.repl.co/remove/assignment', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				id: assignment.id
			})
		})
			.then((res) => {
                console.log(res)
                assignments = assignments.filter( (a) => a.id =! assignment.id)
                
            })
			.catch((err) => console.log(err));
        }
    }
    


    $: assignment, setClassName();
</script>

{#if method == "Edit"}
    <EditAssignment bind:assignment bind:method  bind:workers />
{/if}

<div class={assignmentClass}> 
    <h3>{assignment.title}</h3>
    <p>{assignment.description}</p>
    <p>{assignment.estimated_cost}kr {assignment.estimated_time}h {assignment.deadline.split('T')[0]}</p>
    <div class="btn container">
        <button on:click={()=>editAssignment(assignment)} class="btn">Edit</button>
        <button on:click={() => deleteAssignment(assignment)} class="btn">Delete</button>
    </div>
</div>


<style>
	.completed {
		background-color: green;
	}
	.uncompleted {
		background-color: yellow;
	}
	.unassigned {
		background-color: whitesmoke;
	}
    .deadline {
        background-color: red;
    }
    .btn{
        width: 100%;
    }
    .btn.container {
        display: flex;
    }
</style>