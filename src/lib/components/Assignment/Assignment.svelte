
<script>
	

	
    
    //Stores
	import { role } from "../../stores/role";
	import { user } from "../../stores/user";
    
    

    export let assignment, method, task;
    
	let assignmentClass = "";
    const setCompleted = () => { assignmentClass = assignment.priority ? "status completed priority" :"status completed" }
    const setUncompleted = () => {assignmentClass = assignment.priority ? "status uncompleted priority" : "status uncompleted"}
    const setDeadline = () => {assignmentClass = assignment.priority ? "status deadline priority" : "status deadline"}
    const setUnassigned = () => {assignmentClass = assignment.priority ? "status unassigned priority" : "status unassigned"}

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
        method = "Delete";
        task = job;
    }


    // let worker = getWorker();    
    // async function getWorker(){
    //     let res = await fetch('https://Mini-axami.antonpandi.repl.co/worker', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		credentials: 'include',
    //         body: JSON.stringify({
    //             id : assignment.worker_id
    //         })
	// 	})
    //     return await res.json();
    // }
    


    $: assignment, setClassName();
    // $: worker, console.log(worker);
</script>


    <div class="container assignment"> 
        <div class="grid_container">
            <div class="priority_container">
                <p>{assignment.priority ? "High Priority": "Low Priority"}</p>
                <div class={assignmentClass}></div>
                <p>{assignment.worker_id ? "Worker assigned" : "No assigned worker"}</p>
            </div>
            <div assignment_container>
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>{assignment.estimated_cost?assignment.estimated_cost:0}kr {assignment.estimated_time?assignment.estimated_time:0}h </p> 
                <p>{assignment.deadline} </p>
                <p>{assignment.comment ? assignment.comment : "No comments"}</p>
            </div>
        </div>
        <div class="btn_container">
            
            {#if $role == 'WORKER'}
                {#if !assignment.worker_id}
                    <button on:click={()=>{takeOnAssignment(assignment)}} class="btn"> Take on Assignment </button>
                {:else if assignment.worker_id == $user.id}
                    {#if assignment.completed}
                        <button on:click={()=>{uncompleteAssignment(assignment)}} class="btn"> Uncomplete Assignment </button>
                    {:else}
                        <button on:click={()=>{completeAssignment(assignment)}} class="btn"> Complete Assignment </button>
                        <button on:click={()=>{dropAssignment(assignment)}} class="btn"> Drop Assignment </button>
                    {/if}
                {/if}
            {:else if $role == "ADMIN" || $role == "CLIENT"}
                <button on:click={()=>editAssignment(assignment)} class="btn">Edit</button>
                <button on:click={() => deleteAssignment(assignment)} class="btn red">Delete</button>
            {/if}
            
        </div>
    </div>

<style>

    .container .assignment{
        background-color: var(--black)
    }
    

    .grid_container{
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

    .status {
        width: 3rem;
        height: 3rem;
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

    .priority{
        border: 5px solid brown;
    }

    .priority_container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
</style>