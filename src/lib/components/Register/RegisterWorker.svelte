<script>
	import { goto } from '$app/navigation';
	import URL from '$lib/components/URL.js'

	let fname = '',
		lname = '',
		email = '',
		password = '';

	const submit = async () => {
		const res = await fetch(URL('/add/worker'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				fname,
				lname,
				email
			})
		});
		await console.log(JSON.stringify(res));
		await goto('/login');
	};
</script>

<form on:submit|preventDefault={submit}>
	<h4>First name</h4>
	<input bind:value={fname} type="text" name="fname" placeholder="First Name" />
	<hr />
	<h4>Last name</h4>
	<input bind:value={lname} type="text" name="lname" placeholder="Last Name" />
	<hr />
	<h4>Email</h4>
	<input bind:value={email} type="email" name="email" placeholder="Email" />
	<hr />

	<button type="submit"> Register </button>
</form>
