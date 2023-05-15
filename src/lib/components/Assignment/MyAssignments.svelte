<script>
	import Assignment from '$lib/components/Assignment/Assignment.svelte';
	import { onMount } from "svelte";
	import EditAssignment from './EditAssignment.svelte';
	import { bind } from 'svelte/internal';

    //variables
    let assignments, task, method;

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

{#if method}
    <EditAssignment bind:assignment={task} bind:method />
{:else}
	{#if assignments}
		{#each assignments as assignment}
		<Assignment bind:assignment bind:method bind:task/>
		{/each}
	{/if}
{/if}