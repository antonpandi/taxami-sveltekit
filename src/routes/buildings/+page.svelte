<script>
	import { buildings } from '$lib/stores/buildings';
    import Building from '../../lib/components/Building.svelte';
	import { authenticated} from '$lib/stores/auth';
	import { role } from '$lib/stores/role';
	import { user } from '$lib/stores/user';


	import { page } from '$app/stores';
	// import { page } from '$lib/stores/page';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import URL from "$lib/components/URL.js"
	import { building } from '$lib/stores/building';
    let selected = false;

    
    function setBuilding(props){
        $building = props;
        goto("/buildings/"+$building.id)
    }


    async function getBuildings(){
        let res = await fetch(URL('buildings/all'), {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
		})

        $buildings = await res.json();
        console.log("Buildings", $buildings);
        return $buildings;
    }


</script>

<h1>Buildings</h1>

{#await getBuildings()}
    <p>Loading buildings...</p>
{:then buildings}
    {#each buildings as b}
        <div class="building" on:click|preventDefault={() => {setBuilding(b)}}>
            <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg" alt="">
            <div class="info">
                <a href="/" on:click|preventDefault={() => {setBuilding(b)}}>
                    <h3 class="adress">{b.adress}</h3>
                </a>
                <p>{b.type}</p>
            </div>
        </div>
    {/each}
{:catch error}
    <p>{error.message}</p>
{/await}

<style>
    .building{
        height: 8rem;
        width: 100%;
        padding-left: 5%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .building img{
        width: auto;
        height: 100%;
        object-fit: cover;
    }

    .building:nth-child(even){
        background-color: #FFFFFF;
    }

    .info{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem 1rem;
    }

</style>