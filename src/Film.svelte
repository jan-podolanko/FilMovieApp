<script>
	import { deleteDoc,doc,increment,updateDoc } from "firebase/firestore";
	import { deleteObject,getDownloadURL,ref } from "firebase/storage";
	import { addFavorite,db,removeFavorite,storage } from './firebase.js';
	export let title, directors, cast, synopsis, release, id, currentUser, uploadId, likes, dislikes, email, favorited_by;
	export let close = false;

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
	img.setAttribute("src",url)})
	
</script>

<div id='film'>
{#if currentUser === uploadId}
<button class="btn btn-danger material-icons" id='delete-button' on:click={()=>deleteFilm(id)}>delete_forever</button>
{/if}

{#if favorited_by.includes(currentUser)}
	<button class="material-symbols-outlined favorite-button" on:click={()=>removeFavorite(currentUser,id)}>heart_broken</button>
{:else}
	<button class="material-symbols-outlined favorite-button" on:click={()=>addFavorite(currentUser,id)}>favorite</button>
{/if}

<img id="film-poster" alt="Movie">
<p id="title">{title}</p>
<p id="uploader">Uploaded by: {email}</p>
<p>Release date: {release.toDate().getDate()}.{release.toDate().getMonth()}.{release.toDate().getFullYear()}</p>
<p>Directors: {directors}</p>
<p>Cast: {cast}</p>
<div class="like-container">
	<button id="like-button" class="btn btn-primary material-icons" on:click|once={()=>updateLikes(id,1)}>thumb_up</button>
	<div id="like-counter">{likes}</div>
	<div id="dislike-counter">{dislikes}</div>
	<button id="dislike-button" class="btn btn-primary material-icons" on:click|once={()=>updateLikes(id,-1)}>thumb_down_alt</button>
</div>
<p>Synopsis: {synopsis}</p>
</div>