<script>
	import { goto } from '$app/navigation';
	import { page } from '../../stores/page';

	let type = '',
		adress = '';

	const setType = (ev) => {
		type = ev.target.value;
	};

	const submit = async () => {
		let body = JSON.stringify({ type, adress });
		console.log('Sending request', 'Body: ', body);

		const response = await fetch('https://Mini-axami.antonpandi.repl.co/add/buildings', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				type,
				adress
			})
		});

		console.log(response);
		page.set('my_buildings');
		console.log('Page show: ' + $page);
	};
</script>

<form on:submit|preventDefault={submit}>
	<h2>New Building</h2>
	<h4>House</h4>
	<input on:change={setType} type="radio" name="type" value="house" />
	<h4>Appartment</h4>
	<input on:change={setType} type="radio" name="type" value="apartment" />
	<h4>Adress</h4>
	<input bind:value={adress} type="text" name="adress" placeholder="Adress" />
	<hr />
	{adress}
	{type}
	<button type="submit">Add Building</button>
</form>
