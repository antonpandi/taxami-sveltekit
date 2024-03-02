<script>
	import { workers } from '$lib/stores/workers.js';
    import URL from "$lib/components/URL.js"
	import { onMount } from 'svelte';
    export let building;

    onMount(async () =>{
        getWorkers();
    })



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
				building
			})
		})
		try {
				let result = await response.json()
                $workers = result.workers;
				console.log("Workers: ", $workers)
				return result;
		} catch (error) {
			console.log(error)
		}
	};

    async function getAssignments(){

		try {
            
            let response = await fetch(URL('assignments/all'), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })

			let res = await response.json()

            let data = res.result;
			console.log(data);

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
<div class="building">
    <h2>{building.adress}</h2>
    <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="">

    <div class="assignments">
        {#await getAssignments()}
            Loading assignemtns...
        {:then assignments}
            {#each assignments as assignment}
                <div class="assignment" >
                <h3>{assignment.title}</h3>
                <p>{assignment.description}</p>
                </div>
            {/each}
        {:catch error}
            <p>No assignemtns found</p>
            {error}
        {/await}
    </div>
</div>

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