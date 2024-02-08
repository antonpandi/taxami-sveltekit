<script>
	import { goto } from '$app/navigation';
	import URL from "../URL.js"

	let email = '',
		password = '';

	const submitClient = async () => {
		console.log('Submit:', 'Email:', email, 'Password:', password);

		await fetch(URL('login/client'), {
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
	<div class="form_item">
		<h4>Email:</h4>
		<input bind:value={email} type="email" name="email" placeholder="Email" />
	</div>
	<br />
	<div class="form_item ">
		<h4>Password:</h4>
		<input bind:value={password} type="password" name="password" placeholder="Password" />
	</div>
	<br />

	<button type="submit"> Login </button>
</form>
