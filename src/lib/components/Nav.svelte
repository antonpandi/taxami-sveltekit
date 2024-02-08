<script>
	import Nav from './Nav.svelte';
	import URL from './URL.js'
	import { authenticated } from '../stores/auth';
	import { page } from '../stores/page';
	// import {page} from '$app/stores';
	import { goto } from '$app/navigation';
	import { role } from '../stores/role';
	import { user } from '../stores/user';
	import { onMount } from 'svelte';

	onMount(()=> $page = "login")

	let swap = true,
	navcontainerclass = "container",
	hamburgerclass = "hamburger",
	menuclass = "menu is-hidden";

	const logout = async () => {
		await fetch(URL('/logout'), {
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


<nav class="navbar">
	<ul class="navbar-nav">
		<li class="logo">
			<a href="" class="nav-link">
				<span class="link-text">Taxami</span>
			</a>
		</li>
		<li class="nav-item">
			<a href="/" class="nav-link">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
				</svg>
				<span class="link-text">Home</span>
			</a></li>
		<li class="nav-item" class:selected={$page=="login"}>
			<a href="/login" class="nav-link">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
				</svg>
				<span class="link-text">Login</span>
			</a></li>
		<li class="nav-item" class:selected={$page=="register"}>
			<a href="/register" class="nav-link">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
				<span class="link-text">Register</span>
			</a></li>
	</ul>
</nav>


<style>

	.logo{
		font-weight: bold;
		text-transform: uppercase;
		margin-bottom: 1rem;
		text-align: center;
		font-size: 1.5rem;
		letter-spacing:0.3ch;
		width: 100%;
		
		color: var(--secondary);
		background: var(--selected);
	}

	.navbar-nav{
		list-style: none;
		padding: 0;
		margin:0;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	.nav-item{
		width: 100%;
	}
/* 
	.nav-item:last-child{
		margin-top: auto;
	} */

	.nav-link{
		display: flex;
		align-items: center;
		height: 5rem;
		text-decoration: none;
		color: var(--secondary);
		filter: grayscale(100%) opacity(0.7);
		transition: 600ms;
	}

	.nav-link:hover{
		filter: grayscale(0) opacity(1);
		background: var(--selected);
		color: white;
	}

	.link-text{
		display: none;
		margin-left: 1rem;
	}

	.nav-link svg{
		min-width: 2rem;
		margin: 0 1.5rem;
	}




/* Big */
@media only screen and (min-width: 600px) {
	.navbar{
	
    	top: 0;
		width: 5rem;
    	height: 100vh;
	}
	.navbar:hover{
		width: 16rem;
	}
	.navbar:hover .link-text{
		display: inline;
	}

}

@media only screen and (max-width: 600px) {
	.navbar{
	
    	bottom: 0;
		width: 100vw;
    	height: 5rem;
	}

	.logo{
		display: none;
	}

	.navbar-nav{
		flex-direction: row;
	}

	.nav-link{
		justify-content: center;
	}
}


</style>
