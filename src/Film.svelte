<script>
	import { getDownloadURL,ref } from "firebase/storage";
	import { storage } from './firebase.js';
	export let title;
	export let directors;
	export let cast;
	export let synopsis;
	export let release;
	export let close = false;
	export let id;

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
<p>Synopsis: {synopsis}</p>
</div>

<style>
	#image{
		width: 100%;
	}
</style>