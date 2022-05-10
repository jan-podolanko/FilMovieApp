<script>
	import { deleteDoc,doc,increment,updateDoc } from "firebase/firestore";
	import { deleteObject,getDownloadURL,ref } from "firebase/storage";
	import { addFavorite,addTrailer,db,removeFavorite,storage } from '../firebase.js';
	export let title, directors, cast, synopsis, release, id, currentUser, uploadId, likes, dislikes, email, favorited_by, trailer;
	let link;

	async function updateLikes(id, like){
		if(like > 0){
			await updateDoc(doc(db, "films", id),{likes: increment(like)})
		} else {
			await updateDoc(doc(db, "films", id),{dislikes: increment(like)})
		}
	}

	async function deleteFilm(id){
		let sure = confirm("Are you sure?");
		if(sure){
			await deleteDoc(doc(db, "films", id));
			deleteObject(ref(storage, `images/${id}.jpeg`));
			setTimeout(function () {window.location.reload();}, 500);
		}
	}

	$: getDownloadURL(ref(storage, `images/${id}.jpeg`)).then((url) =>{
	let img = document.getElementById("film-poster")
	img.setAttribute("src",url)});

</script>

<div id='film'>
	<div id="buttons-plus-title">
	{#if currentUser === uploadId}
		<button class="btn btn-danger material-icons" id='delete-button' on:click={()=>deleteFilm(id)}>delete_forever</button>
	{/if}
	{#if favorited_by.includes(currentUser)}
		<button class="material-symbols-outlined favorite-button" on:click={()=>removeFavorite(currentUser,id)}>heart_broken</button>
	{:else}
		<button class="material-symbols-outlined favorite-button" on:click={()=>addFavorite(currentUser,id)}>favorite</button>
	{/if}
	</div>
	<img id="film-poster" alt="Movie">
	<p id="title">{title}</p>
	<p id="uploader">Uploaded by: {email}</p>
	<p>Release date: {release.toDate().getDate()}.{release.toDate().getMonth()+1}.{release.toDate().getFullYear()}</p>
	<p>Directors: {directors}</p>
	<p>Cast: {cast}</p>
	<div class="like-container">
		<button id="like-button" class="btn btn-primary material-icons" on:click|once={()=>updateLikes(id,1)}>thumb_up</button>
		<div id="like-counter">{likes}</div>
		<div id="dislike-counter">{dislikes}</div>
		<button id="dislike-button" class="btn btn-primary material-icons" on:click|once={()=>updateLikes(id,-1)}>thumb_down_alt</button>
	</div>
	<p>Synopsis: {synopsis}</p>
	{#if trailer}
	<div>Trailer:</div>
	<iframe id="trailer-player" width="90%" height="200" src="https://www.youtube.com/embed/{trailer}" title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	{/if}
	{#if currentUser === uploadId}
	<div id="add-trailer">
		<label for="trailer">Add or change trailer</label>
		<input placeholder="Youtube link" type="text" id="youtube-link" bind:value={link}>
		<button on:click={addTrailer(id,link)}>Add</button>
	</div>
	{/if}
</div>