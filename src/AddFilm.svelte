<script>
  import { Timestamp } from 'firebase/firestore';
  import { fade } from 'svelte/transition';
  import { addFilm } from "./firebase";
  let title, synopsis, release, cast, directors, files;
  export let user_email, user_id

  function vibrate(){
		navigator.vibrate([200,50,200]);
		let audio = document.getElementById("audio");
    audio.play();
	}

</script>

<div transition:fade>
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
      <input type="title" class="form-control" id="title-input" bind:value={title} aria-required="true">
    </div>
    <div class="form-group">
      <label for="inputSynopsis">Release</label>
      <input type="date" class="form-control" id="release-input" bind:value={release} aria-required="true">
    </div>
    <div class="form-group">
      <label for="inputSynopsis">Directors</label>
      <input type="synopsis" class="form-control" id="directors-input" bind:value={directors} aria-required="true">
    </div>
    <div class="form-group">
      <label for="inputSynopsis">Cast</label>
      <input type="synopsis" class="form-control" id="cast-input" bind:value={cast} aria-required="true">
    </div>
    <div class="form-group">
      <label for="inputSynopsis">Synopsis</label>
      <input type="synopsis" class="form-control" id="synopsis-input" bind:value={synopsis} aria-required="true">
    </div>
  </form>
  <button class="btn btn-primary" on:click={()=>addFilm(title,Timestamp.fromDate(new Date(release)),cast,directors,synopsis,files,user_id,user_email)} on:click={()=>vibrate()} action="#">Submit</button>
</div>