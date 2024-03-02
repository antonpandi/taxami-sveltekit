<script>
	import { assignments } from './../../../lib/stores/assignments.js';
	import { page } from "$app/stores";

    let buildingId = $page.params.buildingId;

	import { workers } from '$lib/stores/workers.js';
    import URL from "$lib/components/URL.js"
	import { onMount } from 'svelte';
	import { building } from "$lib/stores/building";

    // onMount(async () =>{
    //     getWorkers();
    // })


    async function getBuilding(){
        if($building.id != buildingId){
        let res = await fetch(URL("building"), {
            method: "POST",
            headers:{ "content-type": "application/json" },
            credentails: "include",
            body: JSON.stringify({id:buildingId}),
        })
        res = await res.json(); 

        $building = res.building;
        console.log("Result: ", $building)
        }
        // getWorkers();


        return $building;
    }


    async function getWorker(user_id){
        let res = await fetch(URL("get/worker"), {
            method: "POST",
            headers:{ "content-type": "application/json" },
            credentails: "include",
            body: JSON.stringify({id:user_id}),
        })
        console.log(await res.json())
        return await res.json()
    }

    async function getWorkers(){
		let response = await fetch(URL('building/workers'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				building: $building
			})
		})
		try {
				let result = await response.json()
                $workers = result.workers;
				console.log("Workers: ", $workers)
                return $workers;
		} catch (error) {
			console.log(error)
		}
	};

    async function getAssignments(){
        getWorkers();

		try {
            
            let response = await fetch(URL('building/assignments'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({id:$building.id}),
            })

			let res = await response.json()

            let data = res.assignments
			console.log("Assignments: ", data);

            data = data.map((d)=> {
                if (d.worker_id) d.worker = $workers.find((w)=> {return w.id==d.worker_id});
                return d;
            })

            console.log(data)
            
			return data;
		} catch (error) {
			console.log(error)
		}

	}

</script>

{#await getBuilding()}
    <p>Loading building...</p>
{:then building} 
    <div class="building">
        <h2>{building.adress}</h2>
        <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="">

        <div class="assignments">
            {#await getAssignments()}
                Loading assignments...
            {:then assignments}
                {#if assignments.length > 0}
                    {#each assignments as assignment}
                        <div class="assignment" >
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        {#if assignment.worker}
                            <p>Assigned to {assignment.worker.fname} {assignment.worker.lname}</p>
                        {/if}
                        </div>
                    {/each}
                {:else}
                    <h3>There are no assignments for this building</h3>
                {/if}
            {:catch error}
                <p>Could not load assignments</p>
                {error}
            {/await}
        </div>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}







<style>
    .building{
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .assignments{
        width:80%;
        gap:5px;
    }

    .assignment{
        padding: 2rem;
        background-color: #eeeeee;
    }
    .assignment:nth-child(even){
        background-color: #ffffff;
    }
</style>