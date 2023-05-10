<script>
	import Assignment from '$lib/components/Assignment/Assignment.svelte';
	import { onMount } from "svelte";

    //variables
    let assignments;

    onMount(async ()=>{
        
			console.log("trying to get buildings")
			await fetch('https://Mini-axami.antonpandi.repl.co/assignments/worker', {
				method: 'GET',
				credentials: 'include'
			})
			.then(async (res) => assignments = await res.json())
			.catch((err) => console.log(err));
        
    })
</script>


{#if assignments}
	{#each assignments as assignment}
		<Assignment bind:assignment/>
	{/each}
{/if}