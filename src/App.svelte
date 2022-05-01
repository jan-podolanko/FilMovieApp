<script>
	import { slide } from 'svelte/transition';
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

<main id="main-page">
	<div id='list-container'>
	<h3>All movies</h3>
	{#await stuff}
	<p>...waiting</p>
	{:then stuff}
	<div id="film-list">
		{#each stuff as film}
			<div on:click={()=>createFilmData(film)} on:click={()=>{close=true}} class="film-list-item" tabindex='0'>{film.title}</div>
		{/each}
	</div>
	{:catch error}
		{error}
	{/await}
	</div>

	<br>
		
	{#if close}
	<div transition:slide|local id="film-container">
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
</main>

