<script>
	import { goto } from '$app/navigation';

	let email = '',
		password = '';

	const submitClient = async () => {
		console.log('Submit:', 'Email:', email, 'Password:', password);

		await fetch('https://Mini-axami.antonpandi.repl.co/login/client', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		goto('/');
	};
</script>

<form on:submit|preventDefault={submitClient}>
	<h4>Email:</h4>
	<input bind:value={email} type="email" name="email" placeholder="Email" />
	<hr />
	<h4>Password</h4>
	<input bind:value={password} type="password" name="password" placeholder="Password" />
	<hr />

	<button type="submit"> Login </button>
</form>
