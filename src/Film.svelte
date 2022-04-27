<script>
	import { deleteDoc,doc,increment,updateDoc } from "firebase/firestore";
	import { getDownloadURL,ref } from "firebase/storage";
	import { db,storage } from './firebase.js';
	export let title, directors, cast, synopsis, release, id, currentUser, uploadId, likes, dislikes;
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
			await deleteDoc(doc(db, "films", id))
		}
		console.log(sure)
	}

	$: getDownloadURL(ref(storage, `images/${id}.jpeg`)).then((url) =>{
	let img = document.getElementById("image")
	img.setAttribute("src",url)})
	
</script>
<div id='film'>
{#if currentUser === uploadId}
<div class="row">
<div class="col-8"></div>
<button class="btn btn-danger col-4 material-icons" id='deleteButton' on:click={()=>deleteFilm(id)}>delete_forever</button>
</div>
{/if}
<img id="image" alt="Movie">
<p>Title: {title}</p>
<p>Release date: {release.toDate().getDate()}.{release.toDate().getMonth()}.{release.toDate().getFullYear()}</p>
<p>Directors: {directors}</p>
<p>Cast: {cast}</p>
<div class="row">
<button class="col-4 btn btn-primary material-icons" on:click|once={()=>updateLikes(id,1)}>thumb_up</button>
<div class="col-2">Likes: {likes}</div>
<div class="col-2">Dislikes: {dislikes}</div>
<button class="col-4 btn btn-primary material-icons" on:click|once={()=>updateLikes(id,-1)}>thumb_down_alt</button>
</div>
<p>Synopsis: {synopsis}</p>
</div>

<style>
	#image{
		width: 100%;
	}

	#deleteButton{
		right: 10;
	}
</style>