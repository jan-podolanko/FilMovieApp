<script>
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { fade } from 'svelte/transition';
    import { initAuth } from '../auth';
    import { auth } from '../firebase.js';
    const { loginWithEmailPassword, signUpWithEmailPassword, loginWithGoogle, logout, user } = initAuth();
    import NavBar from './NavBar.svelte'
    
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
            alert("Passwords don't match up.");
            navigator.vibrate(300);
        }
    };
</script>
<main class="hide-scroll">
    <div>
        {#if $user}
        <span></span>
        {:else if !shown}
        <div class="log-in-container">
            <div id="app-name">
                <img src="icon.png" alt="Logo">
            </div>
            <form>
                <div class="input-field">
                    <!-- <label for="email">Email</label> -->
                    <input
                    class="input-field"
                    bind:value={email}
                    id="email"
                    type="email"
                    placeholder="Email"
                    />
                </div>
                <div class="input-field">
                    <!-- <label for="password">Password</label> -->
                    <input
                    class="input-field"
                    bind:value={password}
                    id="password"
                    type="password"
                    placeholder="Password"
                    />
                </div>
                {#if error}
                    <div class="error-message" transition:fade>{error.message}</div>
                {/if}
                <div>
                    <div class="buttons">
                        <button id="sign-in" type="button" on:click|preventDefault={(e)=>loginHandler(e)}>Sign In</button>
                        <button id="sign-up" type="button" on:click={show}>Sign Up</button>
                    </div>
                    <button id="sign-in-google" type="button" on:click|preventDefault={loginWithGoogle}>Sign In with Google</button>
                </div>
            </form>
        </div>

        {:else if shown}
        <div class="log-in-container">
            <div id="app-name">
                <img src="icon.png" alt="Logo">
            </div>
            <form>
            <div class="input-field">
                <input
                class="input-field"
                bind:value={semail}
                id="email"
                type="email"
                placeholder="Email"
                />
            </div>
            <div class="input-field">
                <input
                class="input-field"
                bind:value={spassword}
                id="password"
                type="password"
                placeholder="Password"
                />
            </div>
            <div class="input-field">
                <input
                class="input-field"
                bind:value={scpassword}
                id="scpassword"
                type="password"
                placeholder="Confirm password"
                />
            </div>
            {#if error}
                <div transition:fade class="error-message">{error.message}</div>
            {/if}
            <div class="buttons">
                <button id="register" type="button" on:click|preventDefault={()=>checkpassword()}>Sign Up</button>
                <button id="back" type="button" on:click={show}>Back</button>
            </div>
        </form>
        </div>
        {/if}
{#if $user}
  <NavBar user_id={$user.id} user_email={$user.email} logout={logout}/>
{/if}
</main>