  <script>
	  import URL from '$lib/components/URL.js'
    import { onMount } from "svelte";
    let workers = [];

    onMount(async () => {
      const data = await fetch(URL("workers"));
      let result = await data.json();
      console.log(data);
      console.log(result);
      workers = result.workers;
    });
  </script>
  
  <div>
    {#each workers as worker (worker.id)}
      <div>
        <h4>{worker.fname} {worker.lname}</h4>
        <p>{worker.email}</p>
      </div>
    {:else}
      <p>There are now workers available</p>
    {/each}
  </div>
  