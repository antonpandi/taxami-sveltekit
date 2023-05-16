<script>
	import Nav from './Nav.svelte';
	import { authenticated } from '../stores/auth';
	import { page } from '../stores/page';
	import { goto } from '$app/navigation';
	import { role } from '../stores/role';
	import { user } from '../stores/user';

	let swap = true,
	navcontainerclass = "container",
	hamburgerclass = "hamburger",
	menuclass = "menu is-hidden";

	const logout = async () => {
		await fetch('https://Mini-axami.antonpandi.repl.co/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		});
		authenticated.set(false);
		role.set(false);
		page.set(false);
		user.set(false);
		
		await goto('/login');
	};
	const setPage = () => {
		page.set('home');
		console.log('Page set to: ', $page);
	};

	const myBuildings = () => {
		$page = 'my_buildings';
		console.log('Page set to: ', $page);
	};
	const addBuilding = () => {
		$page='add_building';
		console.log('Page set to: ', $page);
	};
	const buildings = () => {
		page.set('my_buildings');
		console.log('Page set to: ', $page);
	};
	const availableAssignments = () => {
		page.set('available_jobs');
		console.log('Page set to: ', $page);
	};
	const myAssignments = () => {
		page.set('my_jobs');
		console.log('Page set to: ', $page);
	}


	function hamclick(){

		if(swap){
			navcontainerclass = "container is-active"
			hamburgerclass = "hamburger"
			menuclass = "menu"
		}
		else{
			navcontainerclass = "container"
			hamburgerclass = "hamburger"
			menuclass = "menu is-hidden"
		}
		swap = !swap
	}








</script>
<nav id="navbar" >
	<div id="nav-container" class={navcontainerclass}>
		<!-- <h1>Header</h1> -->
		<div id="menu" class={menuclass}>
			<div class="nav"><a on:click={setPage} class="is-active">Home</a></div>
			{#if $role == "WORKER"}
					<div class="nav"><a on:click={buildings}>Buildings</a></div>
					<div class="nav"><a on:click={availableAssignments}>Available Jobs</a></div>
					<div class="nav"><a on:click={myAssignments}>My Jobs</a></div> 	
				{:else if $role == "ADMIN" || $role == "CLIENT"}
					<div class="nav"><a on:click={myBuildings}>My Buildings</a></div>
					<div class="nav"><a on:click={addBuilding}>Add New Building</a></div>	
			{/if}
			{#if $authenticated}
				<div class="nav"><a href="/" on:click={logout}>Logout</a></div>
			{:else}
				<div class="nav"><a href="/register">Register</a></div>
				
				<li class="nav"><a href="/login">Login</a></li>
			{/if}
		</div>

		<button on:click={hamclick} id="hamburger" class={hamburgerclass}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>
<!-- <nav>
	<ul class="nav_container">
		<li><a on:click={setPage} href="/#">Home</a></li>
		{#if $authenticated}
			<li><a href="/" on:click={logout}>Logout</a></li>
		{:else}
			<li><a href="/register">Register</a></li>
			<li><a href="/login">Login</a></li>
		{/if}
	</ul>
</nav> -->


<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
		border-radius: 1rem;
	}

	.nav{
		cursor: pointer;
		padding:1rem;
		display: flex;
		align-items: center;
	}

	ul {
		margin: 0;
		padding: 0;
	}
	.nav_container {
		display: flex;
		justify-content: space-between;
	}

	li {
		display: block;
		float: left;
	}
	li.nav{
		cursor: pointer;
		padding:1rem;
	}
	li.nav:hover{
		background-color: var(--cyan);
	}
	

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		font-size: 22px;
	}:root {
    --primary: #8c38ff;
    --light:  #EEEEEE;
    --dark: #212121;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
}
.menu a{
    all: unset;
    color: aliceblue
}

.container{

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu {
    padding: 8px;
    border-radius: 0 0 6px  0;

    position: absolute;
    top: 50px;
    left: 0px;

    display: grid;
    gap: 5px;

    background-color: var(--lightblue);
}
.is-hidden {
    display: none;
}

#navbar{
    container: navbar / inline-size;

    left: 0;
    right: 0;
    z-index: 99;
    background-color: var(--lightblue);
    padding: 16px 32px;
    border-bottom: 3px solid var(--lightblue);
}

.hamburger{
    display: block;
    position: relative;
    z-index: 1;

    user-select: none;

    appearance: none;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
}

.hamburger span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 4px;
    position: relative;

    background-color: var(--lightgray);
    border-radius: 6px;
    z-index: 1;

    transform-origin: 0 0;

    transition: 0.4s;
}

.hamburger:hover span:nth-child(2) {
    transform: translateX(10px);
    background-color: var(--lightblue);
}

.hamburger.is-active span:nth-child(1) {
    transform: translate(0px, -2px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
    opacity: 0;
    transform: translateX(15px);
}

.hamburger.is-active span:nth-child(3) {
    transform: translate(-3px, 3px) rotate(-45deg);
}

.hamburger.is-active:hover span {
    background-color: var(--lightblue);
}


@media (min-width: 768px) {
    nav .hamburger {
        display: none;
    }
    .menu {
        position: relative;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

}


/* @container navbar(inline-size >500px){
    nav .hamburger {
        display: none;
    }
    .menu {
        position: relative;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
} */


/* 
.test{
   margin-top:400px;
    container: test / inline-size;
    width: 100%;
    border:1px solid red;
    padding:2%;
}


@container test(inline-size>500px){

    .test h2{
        font-size:6rem;
        color:blue;
    }

}  */
</style>
