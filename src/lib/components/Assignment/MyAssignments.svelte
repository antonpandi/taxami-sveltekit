<script>
	import { onMount } from "svelte";

    //variables
    let assignment;

    onMount(async ()=>{
        
			console.log("trying to get buildings")
			await fetch('https://Mini-axami.antonpandi.repl.co/assignments/available', {
				method: 'GET',
				credentials: 'include'
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        
    })
</script>