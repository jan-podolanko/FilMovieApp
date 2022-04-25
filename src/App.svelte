<script>
 	import { Timestamp } from 'firebase/firestore';
 	import { addFilm,showStuff } from './firebase.js';

	let title, synopsis, release, cast, directors;
	let stuff = showStuff();
	let shown = false;
	let selected;
	
	function show(){
		shown = !shown
		let container = document.getElementById('film');
		container.innerHTML = ''
	}

	function createDiv(variable){
		let container = document.getElementById('film');
		container.innerHTML = ''
		let title = document.createElement('p');
		title.innerHTML = 'Title: ' + variable.title;

		let release = document.createElement('p');
		release.innerHTML = 'Release date: ' + variable.release.toDate().getDate() + '.' + variable.release.toDate().getMonth() + '.' + variable.release.toDate().getFullYear();

		let directors = document.createElement('p');
		directors.innerHTML = 'Directors: ' + variable.directors;

		let cast = document.createElement('p');
		cast.innerHTML = 'Cast: ' + variable.cast;

		let synopsis = document.createElement('p');
		synopsis.innerHTML = 'Synopsis: ' + variable.synopsis;

		container.append(title,release,directors,cast,synopsis);
	}
</script>

<main>
	<div id='list-container'>
	{#await stuff}
	<p>...waiting</p>
	{:then stuff}
	<ul class="list-group">
		{#each stuff as film}
			<div on:click={()=>createDiv(film)} class="list-group-item list-group-item-action">{film.title}</div>
		{/each}
	</ul>
	{:catch error}
		{error}
	{/await}
	</div>
	
	<div id="film"></div>

	{#if !shown}
	<button class="btn btn-primary" on:click={show}>Add movie</button>
	{/if}

	{#if shown}
	<button class="btn btn-primary" on:click={show}>Close</button>
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
				<input type="synopsis" class="form-control" id="cast-input" bind:value={cast}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Directors</label>
				<input type="synopsis" class="form-control" id="directors-input" bind:value={directors}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Release</label>
				<input type="date" class="form-control" id="release-input" bind:value={release}>
			</div>
		

			<button type="submit" class="btn btn-primary" on:click={()=>addFilm(title,Timestamp.fromDate(new Date(release)),cast,directors,synopsis)}>Submit</button>
		</form>
	</div>
	{/if}
</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

/* 	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

