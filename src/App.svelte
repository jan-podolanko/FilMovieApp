<script>
	import { Timestamp } from 'firebase/firestore';
 	import { ref,uploadBytes } from 'firebase/storage';
 	import { fade } from 'svelte/transition';
 	import { addFilm,showStuff,storage,auth } from './firebase.js';
  	import { initAuth } from './auth';

	const { loginWithEmailPassword, loginWithGoogle, logout, user } = initAuth();

	let error = null;
	let email = "";
	let password = "";
	const loginHandler = async event => {
	  	try {
			error = null;
			await loginWithEmailPassword( auth, email, password);
	 	} catch (err) {
			error = err;
	  	}
	};

	let title, synopsis, release, cast, directors, files, url;
	let stuff = showStuff();
	let shown = false;

	function uploadPic(files){
		const imgRef = ref(storage, `images/${files[0].name}`);
  	uploadBytes(imgRef, files[0])
	}
	
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
		synopsis.style.textAlign = 'justify'
		synopsis.innerHTML = 'Synopsis: ' + variable.synopsis;

		container.append(title,release,directors,cast,synopsis);
		let film_container = document.getElementById('film-container')
		film_container.style.visibility = 'visible';
	}

	function hideInfo(){
		let film_container = document.getElementById('film-container')
		film_container.style.visibility = 'hidden';
	}

	//getDownloadURL(ref(storage,`images/${files[0]}`))
</script>

<div class="wrapper">
	{#if $user}
	  <div class="w-full max-w-xs">
		<div class="text-center">
		  <h2>{$user.email}</h2>
		  <button type="button" class="mt-3" on:click={logout}>Logout</button>
		</div>
	  </div>
	{:else}
	  <div class="w-full max-w-xs">
		<form
		  class="px-8 pt-6 pb-8 bg-white shadow-md"
		>
		  <div class="mb-4">
			<label for="email">Email</label>
			<input
			  class="input-field"
			  bind:value={email}
			  id="email"
			  type="email"
			  placeholder="name@acme.com"
			/>
		  </div>
		  <div class="mb-6">
			<label for="password">Password</label>
			<input
			  class="input-field"
			  bind:value={password}
			  id="password"
			  type="password"
			  placeholder="******************"
			/>
		  </div>
		  {#if error}
			<div transition:fade class="p-2 mb-6 bg-red-300">{error.message}</div>
		  {/if}
		  <div>
			<button type="button" on:click|preventDefault={(e)=>loginHandler(e)}>Sign In</button>
		  </div>
		  <div class="mt-3">
			<button type="button" on:click|preventDefault={loginWithGoogle}>
			  Sign In with Google
			</button>
		  </div>
		</form>
	  </div>
	{/if}
</div>

<main>
	<div id='list-container'>
	<h3 class="display-6">All movies</h3>
	{#await stuff}
	<p>...waiting</p>
	{:then stuff}
	<ul class="list-group">
		{#each stuff as film}
			<div on:click={()=>createDiv(film)} id="film-list-item" class="list-group-item list-group-item-action" tabindex='0'>{film.title}</div>
		{/each}
	</ul>
	{:catch error}
		{error}
	{/await}
	</div>
	
	<br>
	<div id="film-container">
	<div id="film"></div>
	<button on:click={hideInfo} id='close-info' class="btn btn-primary material-symbols-outlined">
		expand_less
	</button>
	</div>
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
				<label for="inputTitle">Image</label>
				<input type="file" class="form-control" id="file-input" bind:files>
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
		<button class="btn btn-primary" on:click={()=>addFilm(title,Timestamp.fromDate(new Date(release)),cast,directors,synopsis)} action="#">Submit</button>
	</div>
	{/if}

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
		visibility: hidden;
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

