<script>
	import { Timestamp } from 'firebase/firestore';
	import { fade } from 'svelte/transition';
	import Film from './Film.svelte';
	import { addFilm,showStuff } from './firebase.js';
	
	export let user_id, user_email;
	let title, synopsis, release, cast, directors, files;
	let stuff = showStuff();
	let shown = false;
	let film;
	let close = false;
	
	function show(){
		shown = !shown
		close = false
	}

	function createFilmData(variable){
		film = {
			id: variable.id,
			title: variable.title,
			release: variable.release,
			directors: variable.directors,
			cast: variable.cast,
			synopsis: variable.synopsis,
			currentUser: user_id,
			uploadId: variable.user_id,
			likes: variable.likes,
			dislikes: variable.dislikes,
			email: user_email
		}
	}

	function vibrate(){
		navigator.vibrate([200,50,200]);
		let audio = document.getElementById("audio");
    audio.play();
	}

</script>

<main>
	<div id='list-container'>
	<h3 class="display-6">All movies</h3>
	{#await stuff}
	<p>...waiting</p>
	{:then stuff}
	<ul class="list-group">
		{#each stuff as film}
			<div on:click={()=>createFilmData(film)} on:click={()=>{close=true}} id="film-list-item" class="list-group-item list-group-item-action" tabindex='0'>{film.title}</div>
		{/each}
	</ul>
	{:catch error}
		{error}
	{/await}
	</div>

	<br>
		
	{#if close}
	<div transition:fade id="film-container">
	{#if film}
	<Film {...film}/>
	{/if}
	<button on:click={()=>{close = false}} id='close-info' class="btn btn-primary material-symbols-outlined">
		expand_less
	</button>
	</div>
	{/if}
		

	{#if !shown}
	<button id="add-movie-button" class="btn btn-primary material-symbols-outlined" on:click={show}>add</button>
	{/if}

	{#if shown}
	<button id="add-movie-button" class="btn btn-primary material-symbols-outlined" on:click={show}>close</button>
	<div transition:fade>
		<form>
			<div class="form-group row">
				<div class="col-md">
				<label for="inputTitle">Take a picture and upload</label>
				<input type="file" class="form-control" id="file-input" accept="image/*" capture="environment" bind:files>
			</div>
			<div class="col-md">
				<label for="inputTitle">Upload an image from your device</label>
				<input type="file" class="form-control" id="file-input" accept="image/*" bind:files>
			</div>
			</div>
			<div class="form-group">
				<label for="inputTitle">Title</label>
				<input type="title" class="form-control" id="title-input" bind:value={title} ariarequired>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Release</label>
				<input type="date" class="form-control" id="release-input" bind:value={release} ariarequired>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Directors</label>
				<input type="synopsis" class="form-control" id="directors-input" bind:value={directors} ariarequired>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Cast</label>
				<input type="synopsis" class="form-control" id="cast-input" bind:value={cast} ariarequired>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Synopsis</label>
				<input type="synopsis" class="form-control" id="synopsis-input" bind:value={synopsis} ariarequired>
			</div>
		</form>
		<button type="submit" class="btn btn-primary" on:click={()=>addFilm(title,Timestamp.fromDate(new Date(release)),cast,directors,synopsis,files,user_id)} on:click={()=>vibrate()} action="#">Submit</button>
	</div>
	{/if}
	
	<audio id="audio" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio>
</main>


<style>
	*{
		font-family: 'Lato', sans-serif;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 300px;
		margin: 0 auto;
	}

	#film-container{
		border: 1px solid #adb5bd;
		border-radius: 5px;
		visibility: visible;
		padding: 8px 13px;
		max-width: 600px;
		margin: auto;
		/* transition:visibility 1s linear; */
	}
	#film-list-item{
		border-radius: 5px;
		margin: 1px;
	}
	#film-list-item:focus{
		background-color: #0d6efd;
		color: white;
	}

	#add-movie-button{
		position:fixed;
		bottom: 1%;
		right: 2%;
		border-radius: 10px;
	}

	#close-info{
		width: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: 600px;
		}
	}
</style>

