<script>
 	import { Timestamp } from 'firebase/firestore';
 	import { ref,uploadBytes } from 'firebase/storage';
 	import { fade } from 'svelte/transition';
 	import Film from './Film.svelte';
 	import { addFilm,showStuff,storage } from './firebase.js';

	let title, synopsis, release, cast, directors, files, url;
	let stuff = showStuff();
	let shown = false;
	let film;
	let close = false;

	function uploadPic(files){
		const imgRef = ref(storage, `images/${files[0].name}`);
  	uploadBytes(imgRef, files[0])
	}
	
	function show(){
		shown = !shown
		close = false
	}

	function createFilmData(variable){
		film = {
			title: variable.title,
			release: variable.release,
			directors: variable.directors,
			cast: variable.cast,
			synopsis: variable.synopsis
		}
	}

	function vibrate(){
		navigator.vibrate([200,50,200]);
		let audio = document.getElementById("audio");
    audio.play();
	}

	//getDownloadURL(ref(storage,`images/${files[0]}`))
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
		{#if files}
		<button on:click={uploadPic(files)}>Upload image</button>
		{/if}
		<form>
			<div class="form-group">
				<label for="inputTitle">Upload an image from your device or camera</label>
				<input type="file" class="form-control" id="file-input" accept="image/*" capture="environment" bind:files>
			</div>
			<div class="form-group">
				<label for="inputTitle">Title</label>
				<input type="title" class="form-control" id="title-input" bind:value={title}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Release</label>
				<input type="date" class="form-control" id="release-input" bind:value={release}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Directors</label>
				<input type="synopsis" class="form-control" id="directors-input" bind:value={directors}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Cast</label>
				<input type="synopsis" class="form-control" id="cast-input" bind:value={cast}>
			</div>
			<div class="form-group">
				<label for="inputSynopsis">Synopsis</label>
				<input type="synopsis" class="form-control" id="synopsis-input" bind:value={synopsis}>
			</div>
		</form>
		<button class="btn btn-primary" on:click={()=>addFilm(title,Timestamp.fromDate(new Date(release)),cast,directors,synopsis)} on:click={()=>vibrate()} action="#">Submit</button>
	</div>
	{/if}

	<audio id="audio" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio>

</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 300px;
		margin: 0 auto;
	}

/* 	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

/* 	#film{
		
	} */

	#film-container{
		border: 1px solid #adb5bd;
		border-radius: 5px;
		visibility: visible;
		padding: 8px 13px;
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
			max-width: none;
		}
	}
</style>

