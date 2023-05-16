<script>
	import Assignment from '$lib/components/Assignment/Assignment.svelte';
	import { onMount } from "svelte";
	import EditAssignment from './EditAssignment.svelte';
	import { bind } from 'svelte/internal';

    //variables
    let assignments = getTasks(), task, method;

    async function getTasks(){
        
			console.log("trying to get buildings")
			let response = await fetch('https://Mini-axami.antonpandi.repl.co/assignments/worker', {
				method: 'GET',
				credentials: 'include'
			})
			let result = await response.json();
			console.log("Result: ", result);
			return result;
        
    }
</script>

{#if method}
    <EditAssignment bind:assignment={task} bind:method />
{:else}
	{#await assignments}
		<p>Waiting on assignments</p>
	{:then assignments} 
		{#each assignments || [] as assignment}
			<Assignment bind:assignment bind:method bind:task/>
		{:else}
			<p>You have no assignments</p>
		{/each}
		{:catch error}
		<p>{error.message}</p>
	{/await}
{/if}