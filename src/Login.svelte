<script>
    import App from './App.svelte';
	import { fade } from 'svelte/transition';
	import { initAuth } from './auth';
	import { auth } from './firebase.js';
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
</script>
<main>
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
{#if $user}
    <App/>
{/if}
</main>