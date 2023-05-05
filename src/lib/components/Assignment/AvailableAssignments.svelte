
<script>
    import { onMount } from 'svelte';
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