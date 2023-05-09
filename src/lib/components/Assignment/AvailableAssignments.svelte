
<script>
    import { onMount } from 'svelte';
	import Assignment from '$lib/components/Assignment/Assignment.svelte';
    //Variables
    let assignments;

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

{#if assignments}
	{#each assignments as assignment}
	<Assignment bind:assignment />
	{/each}
{/if}