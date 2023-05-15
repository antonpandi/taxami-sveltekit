
<script>
    import { onMount } from 'svelte';
	import Assignment from '$lib/components/Assignment/Assignment.svelte';
	import EditAssignment from './EditAssignment.svelte';
    //Variables
    let assignments = [], task, method;

    onMount(async () => {

		try {
			console.log("trying to get buildings")
			const response = await fetch('https://Mini-axami.antonpandi.repl.co/assignments/available', {
				method: 'GET',
				credentials: 'include'
			});

			assignments = await response.json();

			console.log(assignments);
		} catch (error) {
			console.error(error);
		}
	});

</script>
{#if method}
    <EditAssignment bind:assignment={task} bind:method />
{:else}
	{#if assignments.length > 0}
		{#each assignments as assignment}
		<Assignment bind:assignment bind:method bind:task/>
		{/each}
	{:else}
		<p>There are no available assignments</p>
	{/if}
{/if}