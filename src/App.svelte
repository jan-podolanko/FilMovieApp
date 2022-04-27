<script>
	import { Timestamp } from 'firebase/firestore';
	import { ref,uploadBytes } from 'firebase/storage';
	import { fade } from 'svelte/transition';
	import { initAuth } from './auth';
	import Film from './Film.svelte';
	import { addFilm,auth,showStuff,storage } from './firebase.js';

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

	let title, synopsis, release, cast, directors, files;
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
			id: variable.id,
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
			<div transition:fade class="p-2 mb-6 bg-red-300">Wrong email or password</div>
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
	{#if $user}
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
			<button class="btn btn-primary" on:click={()=>addFilm(title,Timestamp.fromDate(new Date(release)),cast,directors,synopsis, files)} on:click={()=>vibrate()} action="#">Submit</button>
		</div>
		{/if}

		<audio id="audio" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></audio>
	{:else}
		<div></div>
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

