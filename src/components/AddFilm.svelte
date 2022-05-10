<script>
  import { Timestamp } from 'firebase/firestore';
  import { fly } from 'svelte/transition';
  import { addFilm } from "../firebase";
  let title, synopsis, release, cast, directors, files;
  export let user_email, user_id

  let input, image;
	let showImage = false;

  function onChange() {
    const file = input.files[0];
		
    if (file) {
			showImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        image.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);
			
			return;
    } 
		showImage = false; 
  }

</script>

<div transition:fly id="add-film-container">
  <form>
    <div class="add-film-row" id="add-pictures">
      <div>
        <label for="inputTitle">Take a picture</label>
        <input type="file" id="file-input" accept="image/*" capture="environment" bind:files on:change={onChange} bind:this={input}>
      </div>
      <div>
        <label for="inputTitle">Upload an image</label>
        <input type="file" id="file-input" accept="image/*" bind:files on:change={onChange} bind:this={input}>
      </div>
    </div>
    {#if showImage}
    <img bind:this={image} id="film-poster" src='#' alt="Chosen poster">
    {/if}
    <div class="add-film-row">
      <label for="inputTitle">Title</label>
      <input placeholder="Movie Title" type="title" id="title-input" bind:value={title} aria-required="true">
    </div>
    <div class="add-film-row">
      <label for="inputSynopsis">Release</label>
      <input type="date" id="release-input" bind:value={release} aria-required="true">
    </div>
    <div class="add-film-row">
      <label for="inputSynopsis">Directors</label>
      <input placeholder="Director 1, Director 2, Director 3..." type="synopsis" id="directors-input" bind:value={directors} aria-required="true">
    </div>
    <div class="add-film-row">
      <label for="inputSynopsis">Cast</label>
      <input placeholder="Actor 1, Actor 2, Actor 3..." type="synopsis" id="cast-input" bind:value={cast} aria-required="true">
    </div>
    <div class="add-film-row">
      <label for="inputSynopsis">Synopsis</label>
      <input placeholder="What happens in the movie" type="synopsis" id="synopsis-input" bind:value={synopsis} aria-required="true">
    </div>
  </form>
  <button on:click={()=>addFilm(title,Timestamp.fromDate(new Date(release)),cast,directors,synopsis,files,user_id,user_email)} action="#">Submit</button>
</div>