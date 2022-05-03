<script>
	import { fly } from 'svelte/transition';
	import AddFilm from './AddFilm.svelte';
	import Film from './Film.svelte';
	import { showStuff } from './firebase.js';
	
	export let user_id, user_email;
	let stuff = showStuff(sortByTitleAsc);
	let shown = false;
	let film;
	let close = false;
	let showSort = false;
	let func;
	
	function show(){
		shown = !shown
		close = false
	}

	function sortByLikesDesc(a,b) {
		return b.likes - a.likes
	}

	function sortByLikesAsc(a,b) {
		return a.likes - b.likes
	}

	function sortByDateAsc(a,b){
		return a.release.toDate() - b.release.toDate()
	}

	function sortByDateDesc(a,b){
		return b.release.toDate() - a.release.toDate()
	}

	function sortByTitleAsc(a,b){
		if(a.title.toLowerCase().trim() < b.title.toLowerCase().trim()) {return -1}
		if(a.title.toLowerCase().trim() > b.title.toLowerCase().trim()) {return 1}
		return 0
	}

	function sortByTitleDesc(a,b){
		if(a.title.toLowerCase().trim() < b.title.toLowerCase().trim()) {return 1}
		if(a.title.toLowerCase().trim() > b.title.toLowerCase().trim()) {return -1}
		return 0
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
	<div id="sorting-box">
	<button id="sort-button" class="material-symbols-outlined" on:click={()=>showSort = !showSort}>sort</button>
	{#if showSort}
	
		<div>
			<span>Alphabetically: </span>
			<button on:click={()=>stuff = showStuff(sortByTitleAsc)}>a-z</button>
			<button on:click={()=>stuff = showStuff(sortByTitleDesc)}>z-a</button>
		</div>
		<div>
			<span>By likes: </span>
			<button on:click={()=>stuff = showStuff(sortByLikesDesc)} tabindex='0'>best</button>
			<button on:click={()=>stuff = showStuff(sortByLikesAsc)} tabindex='0'>worst</button>
		</div>
		<div>
			<span>By release date: </span>
			<button on:click={()=>stuff = showStuff(sortByDateAsc)}>asc</button>
			<button on:click={()=>stuff = showStuff(sortByDateDesc)}>desc</button>
		</div>
	
	{/if}
	</div>


	<div class="navbar"></div>
	{#if !shown}
		<div id='list-container' transition:fly>
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
	{/if}

	<br>
		
	{#if close}
	<div transition:fly id="film-container">
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
	<div id="add-film-scroll">
	<AddFilm user_id={user_id} user_email={user_email}/>
	</div>
	{/if}
</main>

