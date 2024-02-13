

<script>
    import {user} from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { bind } from 'svelte/internal';
	import URL from '$lib/components/URL.js'

    let profile,method;

    user.subscribe((u) => profile = u)

    onMount(()=>{
        console.log(user)
    })

    function editUser(user) {
        method = "edit";
    }
    function cancel(){
        method = null;
    }
    async function saveProfile() {

        let opt = profile.role == "WORKER" ? "worker" : "client";

        await fetch(URL(`edit/${opt}`), {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				user:$user
			})
		})



        cancel();
    }
</script>
<div class="page-box">
    {#if method}
    <div class="edit_profile profile">
        <h3>First name</h3>
        <input bind:value={$user.fname} type="text" name="" id="">
        <h3>Last name</h3>
        <input bind:value={$user.lname} type="text" name="" id="">
        <h3>Email</h3>
        <input bind:value={$user.email} type="text" name="" id="">
        <div class="btn_container">
            <button on:click={saveProfile} class="btn">Save</button>
            <button on:click={cancel} class="btn red">Cancel</button>
        </div>
    </div>
    {:else}
        <div class="profile ">
            <div class="pfp">
                <img class="pfp"  src="/Default_pfp.png" alt="">
                <p>{$user.fname} {profile.lname}</p>
                <p>{$user.email}</p>
            </div>
            <div on:click={editUser} class="edit"><i class="fa-solid fa-pen"></i></div>
        </div>
    {/if}
</div>
<style>

    .profile-container {
        width:100%;
        height:80vh;
        margin-top: 10rem;
    }
    .edit{
        position: relative;
        top: 0px;
        right: 0px;
    }
    img.pfp{
        widows: 80px;
        height: 80px;
    }
    .profile{
        margin: auto;
        width: 80%;
        height: 60%;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        
        /* box-shadow: 0 30px 40px rgba(0, 0, 0, 0.5); */
    }
    .edit{
        cursor: pointer;
    }
    .edit_profile{
        flex-direction: column;
    }
    .btn_container{
        margin: 2rem;
    }
</style>