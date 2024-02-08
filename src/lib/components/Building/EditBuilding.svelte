<script>
	import { bind } from 'svelte/internal';
	import { goto } from '$app/navigation';
	import { page } from '../../stores/page';
	import URL from '$lib/components/URL.js'

    export let building, method;

	const submit = async () => {

		const response = await fetch(URL('edit/buildings'), {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
                building
			})
		});
        cancel()
	};

    const cancel = () =>{
        method = null;
    }
</script>

<form on:submit|preventDefault={submit}>
	<h2>Edit Building</h2>
	<div class="flex_container">
        
		<div class="flex_container even wide">
			<h4>House</h4>
			<input bind:group={building.type}  type="radio" name="type" value="house" />
			<h4>Appartment</h4>
			<input bind:group={building.type} type="radio" name="type" value="apartment" />
		</div>
		<div class="wide">
            <h4>Adress</h4>
            <input bind:value={building.adress} type="text" name="adress" placeholder="Adress" />
		</div>
	</div>
	<br>
	<hr />
    <div class="flex_container">
        <button type="submit" class="btn">Save</button>
        <button on:click={cancel} class="btn red">Cancel</button>
    </div>
</form>
