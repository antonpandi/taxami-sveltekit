
<script>

	
    
    //Stores
	import { userRole } from "../../stores/auth";
    
    let role = "";
    userRole.subscribe((r)=>role=r)
    

    export let assignment
    
	let assignmentClass = "";
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
    const takeOnAssignment = (task) => {
        console.log("Take On Assignment", task)
    }
    const dropAssignment = (task) => {
        console.log("Drop Assignment", task)
    }
    const editAssignment = (task) => {
        console.log("Role", task)
    }
    const deleteAssignment = async (task) => {
        let option = confirm(`Are you sure you want to delete this assignment? \N ${assignment.title}`)
        console.log(option)
        if(option){
            await fetch('https://Mini-axami.antonpandi.repl.co/remove/assignment', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				id: task.id
			})
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        }
    }
    


    $: assignment, setClassName();
</script>

<div class={assignmentClass}> 
    <h3>{assignment.title}</h3>
    <p>{assignment.description}</p>
    <p>{assignment.estimated_cost}kr {assignment.estimated_time}h {assignment.deadline.split('T')[0]}</p>
    <div class="btn container">
        
        {#if role == 'WORKER'}
            {#if !assignment.worker_id}
                <button on:click={()=>{takeOnAssignment(assignment)}} class="btn"> Take on Assignment </button>
            {:else}
                <button on:click={()=>{dropAssignment(assignment)}} class="btn"> Drop Assignment </button>
            {/if}
        {:else}
            <button on:click={()=>editAssignment(assignment)} class="btn">Edit</button>
            <button on:click={() => deleteAssignment(assignment)} class="btn">Delete</button>
        {/if}
        
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