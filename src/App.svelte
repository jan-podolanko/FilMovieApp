<script>
	import { fade } from 'svelte/transition';
	import AddFilm from './AddFilm.svelte';
	import Film from './Film.svelte';
	import { showStuff } from './firebase.js';
	
	export let user_id, user_email;
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
			email: variable.user_email
		}
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
	<AddFilm user_id={user_id} user_email={user_email}/>
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

