import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import { readable } from 'svelte/store';
import { auth } from './firebase.js';

const userMapper = claims => ({
  id: claims.user_id,
  name: claims.name,
  email: claims.email,
  picture: claims.picture
});

// construction function. need to call it after we
// initialize our firebase app
export const initAuth = (useRedirect = false) => {

  
  const loginWithEmailPassword = (auth, email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  
  const signUpWithEmailPassword = (auth, email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
  
    if (useRedirect) {
      return signInWithRedirect(auth, provider);
    } else {
      return signInWithPopup(auth, provider);
    }
  };
  

  const logout = () => signOut(auth);

  // wrap Firebase user in a Svelte readable store
  const user = readable(null, set => {
    const unsub = onAuthStateChanged(auth, async fireUser => {
      if (fireUser) {
        const token = await fireUser.getIdTokenResult();
        const user = userMapper(token.claims);
        set(user);
      } else {
        set(null);
      }
    });

    return unsub;
  });

  return {
    user,
    loginWithGoogle,
    loginWithEmailPassword,
    logout
  };
};