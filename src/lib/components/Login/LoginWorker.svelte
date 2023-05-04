<script>
	import { goto } from '$app/navigation';

	let email = '';

	const submitWorker = async () => {
		console.log('Submit:', 'Email:', email);

		await fetch('https://Mini-axami.antonpandi.repl.co/login/worker', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				email
			})
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));

		goto('/');
	};
</script>

<form on:submit|preventDefault={submitWorker}>
	<h4>Email:</h4>
	<input bind:value={email} type="email" name="email" placeholder="Email" />
	<hr />

	<button type="submit"> Login </button>
</form>
