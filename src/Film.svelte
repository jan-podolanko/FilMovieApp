<script>
	import { deleteDoc,doc,increment,updateDoc } from "firebase/firestore";
	import { getDownloadURL,ref } from "firebase/storage";
	import { db,storage } from './firebase.js';
	export let title;
	export let directors;
	export let cast;
	export let synopsis;
	export let release;
	export let close = false;
	export let id;

	async function updateLikes(id, like){
  if(like > 0){
    await updateDoc(doc(db, "films", id),{likes: increment(like)})
  } else {
    await updateDoc(doc(db, "films", id),{dislikes: increment(like)})
  }
}

	async function deleteFilm(id){
		await deleteDoc(doc(db, "films", id))
		console.log(id)
	}

	$: getDownloadURL(ref(storage, `images/${id}.jpeg`)).then((url) =>{
	let img = document.getElementById("image")
	img.setAttribute("src",url)})
	
</script>
<div id='film'>
	<p>Id: {id}</p>
<img id="image" alt="Movie">
<p>Title: {title}</p>
<p>Release date: {release.toDate().getDate()}.{release.toDate().getMonth()}.{release.toDate().getFullYear()}</p>
<p>Directors: {directors}</p>
<p>Cast: {cast}</p>
<button id='deleteButton' on:click={()=>deleteFilm(id)}>Delete!</button>
<!-- <button on:click|once={()=>updateLikes(id,1)}>Like</button>
<button on:click|once={()=>updateLikes(id,-1)}>Dislike</button> -->
<p>Synopsis: {synopsis}</p>
</div>

<style>
	#image{
		width: 100%;
	}
</style>