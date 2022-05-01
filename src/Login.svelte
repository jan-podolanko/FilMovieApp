<script>
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { fade } from 'svelte/transition';
    import App from './App.svelte';
    import { initAuth } from './auth';
    import { auth } from './firebase.js';
    const { loginWithEmailPassword, signUpWithEmailPassword, loginWithGoogle, logout, user } = initAuth();

    let error = null;
    let email = "";
    let password = "";
    let spassword = "";
    let scpassword = "";
    let semail = "";
    let shown = false;
    let showerror = false;
    function show() {
        shown = !shown
    };
    const loginHandler = async event => {
      try {
        error = null;
        await loginWithEmailPassword( auth, email, password);
     } catch (err) {
        error = err;
      }
    };
    const signUpHandler = async () => {
      try {
        error = null;
        await createUserWithEmailAndPassword( auth, semail, spassword);
     } catch (err) {
        error = err;
      }
    };
    function checkpassword() {
        if(scpassword===spassword){
            signUpHandler()
            show()
        }
        else {
            showerror = true
        }
    };
</script>
<main>
    <div class="wrapper">
        {#if $user}
        <div class="w-full max-w-xs">
            <div class="text-center">
            <h2>{$user.email}</h2>
            <button type="button" class="mt-3 btn btn-primary" on:click={logout}>Logout</button>
            </div>
        </div>
        {:else if !shown}        
        <div class="log-in-container">
            <div id="app-name">
                <img src="icon.png" alt="Logo">
                <div>FilMovieApp</div>
            </div>
            <form>
                <div class="input-field">
                    <label for="email">Email</label>
                    <input
                    class="input-field"
                    bind:value={email}
                    id="email"
                    type="email"
                    placeholder="name@gmail.com"
                    />
                </div>
                <div class="input-field">
                    <label for="password">Password</label>
                    <input
                    class="input-field"
                    bind:value={password}
                    id="password"
                    type="password"
                    placeholder="*****************"
                    />
                </div>
                {#if error}
                    <div class="error-message" transition:fade>{error.message}</div>
                {/if}
                <div>
                    <button type="button" on:click|preventDefault={(e)=>loginHandler(e)}>Sign In</button>
                    <button type="button" on:click|preventDefault={loginWithGoogle}>Sign In with Google</button>
                    <button type="button" on:click={show}>Sign Up</button>
                </div>
            </form>
        </div>

        {:else if shown}
        <div class="log-in-container">
            <div id="app-name">
                <img src="icon.png" alt="Logo">
                <div>FilMovieApp</div>
            </div>
            <form>
            <div class="input-field">
                <label for="email">Email</label>
                <input
                class="input-field"
                bind:value={semail}
                id="email"
                type="email"
                placeholder="name@gmail.com"
                />
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input
                class="input-field"
                bind:value={spassword}
                id="password"
                type="password"
                placeholder="******************"
                />
            </div>
            <div class="input-field">
                <label for="scpassword">Confirm Password</label>
                <input
                class="input-field"
                bind:value={scpassword}
                id="scpassword"
                type="password"
                placeholder="******************"
                />
            </div>
            {#if error}
                <div transition:fade class="error-message">{error.message}</div>
            {/if}
            <div>
                <button type="button" on:click|preventDefault={()=>checkpassword()}>Sign Up</button>
                <button type="button" on:click={show}>Back</button>
            </div>
        </form>
        {#if showerror}
        <div class="error-message">Wrong password</div>
        {/if}
        </div>
        {/if}
{#if $user}
  <App user_id={$user.id} user_email={$user.email}/>
{/if}
</main>