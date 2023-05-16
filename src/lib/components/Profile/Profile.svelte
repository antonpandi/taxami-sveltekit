

<script>
    import {user} from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { bind } from 'svelte/internal';

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
    function saveProfile() {

        cancel();
    }
</script>
{#if method}
<div class="edit_profile container">
    <h3>First name</h3>
    <input bind:value={profile.fname} type="text" name="" id="">
    <h3>Last name</h3>
    <input bind:value={profile.lname} type="text" name="" id="">
    <h3>Email</h3>
    <input bind:value={profile.email} type="text" name="" id="">
    <div class="btn_container">
        <button on:click={saveProfile} class="btn">Save</button>
        <button on:click={cancel} class="btn red">Cancel</button>
    </div>
</div>
{:else}
    <div class="profile container">
        <div class="pfp">
            <img class="pfp"  src="/Default_pfp.png" alt="">
            <p>{profile.fname} {profile.lname}</p>
            <p>{profile.email}</p>
        </div>
        <div on:click={editUser} class="edit"><i class="fa-solid fa-pen"></i></div>
    </div>
{/if}

<style>
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
        background-color: var(--lightblue);
        margin: auto;
        width: 20%;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .edit{
        cursor: pointer;
    }
    .edit_profile{
        background-color: var(--lightblue);
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: auto;
    }
    .btn_container{
        margin: 2rem;
    }
</style>