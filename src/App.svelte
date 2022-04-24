<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<script>
 	import { collection,getDocs } from "firebase/firestore";
 	import { db } from './firebase.js';

	async function showStuff(){
		const docRef = collection(db, "films");
		const docSnap = await getDocs(docRef)
		const docList = docSnap.docs.map(doc => doc.data());
		return docList
	}

	let stuff = showStuff();

</script>

<main>
	{#await stuff}
	<p>...waiting</p>
	{:then stuff}
	<ul class="list-group">
		{#each stuff as city}
				<li class="list-group-item">{city.title}</li>
		{/each}
	</ul>
	{:catch error}
		{error}
	{/await}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

