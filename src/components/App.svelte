<script>
	import { collection,onSnapshot } from 'firebase/firestore';
	import { fly } from 'svelte/transition';
	import { db } from '../firebase.js';
	import AddFilm from './AddFilm.svelte';
	import Film from './Film.svelte';
	
	export let user_id, user_email;
	let shown = false;
	let film;
	let close = false;
	let showSort = false;
	let selected = 'Sorted by title (a-z)';

	let filtering = (word => word);
	let films = [];
	let q = collection(db, "films")
	let sorting = sortByTitleAsc

	const unsub = onSnapshot(q, (querySnapshot) => {
		films = [];
		querySnapshot.forEach((doc)=> {
			films.push({id:doc.id, ...doc.data()})
		})
		console.log(films)
	});
	
	function show(){
		shown = !shown
		close = false
	}
	
	function sortByLikesDesc(a,b) {
		return (b.likes + b.dislikes) - (a.likes + a.dislikes)
	}

	function sortByLikesAsc(a,b) {
		return (a.likes + a.dislikes) - (b.likes + b.dislikes)
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
			email: variable.user_email,
			favorited_by: variable.favorited_by,
			trailer: variable.trailer
		}
	}
	
	
</script>

<main id="main-page">
	
	<div id="sorting-box">
	
		<div id="sorted-by">
			<button id="sort-button" class="material-symbols-outlined" on:click={()=>showSort = !showSort}>sort</button>
			<div id="sort-selection">
				{selected}
			</div>
		</div>
	{#if showSort}
		<div>
			<span>Alphabetically: </span>
			<button on:click={()=>sorting = sortByTitleAsc} tabindex='0' on:click={()=>selected='Sorted by title (a-z)'}>a-z</button>
			<button on:click={()=>sorting = sortByTitleDesc} tabindex='0' on:click={()=>selected='Sorted by title: (z-a)'}>z-a</button>
		</div>
		<div>
			<span>By likes: </span>
			<button on:click={()=>sorting = sortByLikesDesc} tabindex='0' on:click={()=>selected='Sorted by rating (best)'}>best</button>
			<button on:click={()=>sorting = sortByLikesAsc} tabindex='0' on:click={()=>selected='Sorted by rating (worst)'}>worst</button>
		</div>
		<div>
			<span>By release date: </span>
			<button on:click={()=>sorting = sortByDateAsc} tabindex='0' on:click={()=>selected='Sorted by release date (oldest)'}>asc</button>
			<button on:click={()=>sorting = sortByDateDesc} tabindex='0' on:click={()=>selected='Sorted by release date (newest)'}>desc</button>
		</div>
			<button on:click={()=>filtering = (film => {return film.favorited_by.includes(user_id)})} tabindex='0' on:click={()=>selected='Favorites'}>Favorites</button>
			<button on:click={()=>filtering = (film => film)} tabindex='0' on:click={()=>selected='All movies'}>All movies</button>
	{/if}
	</div>


	<div class="navbar"></div>

		<div id='list-container' transition:fly>
			<div id="film-list">
			{#each films.filter(filtering).sort(sorting) as film}
				<div on:click={()=>createFilmData(film)} on:click={()=>{close=true}} class="film-list-item" tabindex='0'>{film.title}</div>
			{/each}
			</div>
		</div>
	

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

