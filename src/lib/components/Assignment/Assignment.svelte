
<script>

	
    
    //Stores
	import { role } from "../../stores/role";
    

    export let assignment, method, task
    
	let assignmentClass = "";
    const setCompleted = () => {assignmentClass = "status completed"}
    const setUncompleted = () => {assignmentClass = "status uncompleted"}
    const setDeadline = () => {assignmentClass = "status deadline"}
    const setUnassigned = () => {assignmentClass = "status unassigned"}

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
    const takeOnAssignment = (job) => {
        console.log("Take On Assignment", job)
        method = "Take On Task"
        task = job
    }
    const dropAssignment = (job) => {
        console.log("Drop Assignment", job)
        method = "Drop Task"
        task = job
    }
    const completeAssignment = (job) => {
        console.log("Complete Assignment", job)
        method = "Complete"
        task = job
    }
    const uncompleteAssignment = (job) => {
        console.log("Complete Assignment", job)
        method = "Uncomplete"
        task = job
    }
    const editAssignment = (job) => {
        console.log("Role", job)
        method = "Edit";
        task = job;
    }
    const deleteAssignment = async (job) => {
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


    <div class="container assignment"> 
        <div class="flex_container">
            <div class={assignmentClass}>

            </div>
            <div>
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>{assignment.estimated_cost}kr {assignment.estimated_time}h {assignment.deadline.split('T')[0]}</p>
            </div>
        </div>
        <div class="btn_container">
            
            {#if $role == 'WORKER'}
                {#if !assignment.worker_id}
                    <button on:click={()=>{takeOnAssignment(assignment)}} class="btn"> Take on Assignment </button>
                {:else}
                    {#if assignment.completed}
                        <button on:click={()=>{uncompleteAssignment(assignment)}} class="btn"> Uncomplete Assignment </button>
                    {:else}
                        <button on:click={()=>{completeAssignment(assignment)}} class="btn"> Complete Assignment </button>
                        <button on:click={()=>{dropAssignment(assignment)}} class="btn"> Drop Assignment </button>
                    {/if}
                {/if}
            {:else}
                <button on:click={()=>editAssignment(assignment)} class="btn">Edit</button>
                <button on:click={() => deleteAssignment(assignment)} class="btn">Delete</button>
            {/if}
            
        </div>
    </div>

<style>

    .status {
        width: 5rem;
        height: 5rem;
        border-radius: 1rem;
    }
    
	.flex_container{
		display: flex;
		align-items: center;
	}

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
    
</style>