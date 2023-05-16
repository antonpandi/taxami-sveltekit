<script>
	import { authenticated } from '../stores/auth';
	import { page } from '../stores/page';
	import { goto } from '$app/navigation';

	const logout = async () => {
		await fetch('https://Mini-axami.antonpandi.repl.co/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		});
		authenticated.set(false);
		await goto('/login');
	};
	const setPage = () => {
		page.set('home');
		console.log('Page set to: ', $page);
	};
</script>

<nav>
	<ul class="nav_container">
		<li><a on:click={setPage} href="/#">Home</a></li>
		{#if $authenticated}
			<li><a href="/" on:click={logout}>Logout</a></li>
		{:else}
			<li><a href="/register">Register</a></li>
			<li><a href="/login">Login</a></li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
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

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		font-size: 22px;
	}
</style>
