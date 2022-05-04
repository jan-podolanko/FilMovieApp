<script>
 export let logout, user_id, user_email
 import App from "./App.svelte";
</script>

<span>Logged in as {user_email}</span>
<button id="log-out-button" type="button" on:click={logout}>Logout</button>

<App user_email={user_email} user_id={user_id}/>