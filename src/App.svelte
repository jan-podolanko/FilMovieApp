<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<script>
 	import { collection,getDocs } from "firebase/firestore";
 	import { addFilm,db } from './firebase.js';

	async function showStuff(){
		const docRef = collection(db, "films");
		const docSnap = await getDocs(docRef)
		const docList = docSnap.docs.map(doc => doc.data());
		return docList
	}

/* 	async function addFilm(){
		addDoc(collection(db, "films"), {
			name: "Tokyo",
			country: "Japan"
		});
	} */
/* 	function showFilm(film){
		const film_div = document.getElementById("film-container");
		let title = document.createElement("p");
		let string = `Title: {film.title}`;
		title.innerText = {@html string};

	} */
	let title, synopsis, release, cast, directors;
	let stuff = showStuff();
	let shown = false;
	let selected;
	function show(){
		shown = !shown
	}
</script>

<main>
	<div id='list-container'>
	{#await stuff}
	<p>...waiting</p>
	{:then stuff}
	<ul class="list-group">
		{#each stuff as film}
			<div on:click={show} class="list-group-item list-group-item-action">{film.title}</div>
			{#if shown}
				<div>
					<p>Title: {film.title}</p>
					<p>Release date: {film.release.toDate().getDate()}.{film.release.toDate().getMonth()}.{film.release.toDate().getFullYear()}</p>
					{#if film.directors.length == 1}
						<p>Director: {film.directors}</p>
					{:else}
						<p>Directors: {film.directors.join(', ')}</p>
					{/if}
					<p>Cast: {film.cast.join(', ')}</p>
					<p>Synopsis: {film.synopsis}</p>
				</div>
			{/if}
		{/each}
	</ul>
	{:catch error}
		{error}
	{/await}
	</div>

	<button > ayyyy </button>


	<div>
		<form>
			<div class="form-group">
				<label for="inputTitle">Title</label>
				<input type="title" class="form-control" id="title-input" bind:value={title}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Synopsis</label>
				<input type="synopsis" class="form-control" id="synopsis-input" bind:value={synopsis}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Cast</label>
				<input type="synopsis" class="form-control" id="synopsis-input" bind:value={cast}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Directors</label>
				<input type="synopsis" class="form-control" id="synopsis-input" bind:value={directors}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Release</label>
				<input type="synopsis" class="form-control" id="synopsis-input" bind:value={release}>
			</div>

			<button type="submit" class="btn btn-primary" on:click={()=>addFilm(title,release,cast,directors,synopsis)}>Submit</button>
		</form>
	</div>
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

