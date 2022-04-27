	// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, increment, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTxYCCdNqI_Yk9rg4nG7Uhe-FG0NJZHgE",
  authDomain: "filmovieapp.firebaseapp.com",
  projectId: "filmovieapp",
  storageBucket: "filmovieapp.appspot.com",
  messagingSenderId: "515603933205",
  appId: "1:515603933205:web:5e94d9ae5638c53257c61c",
  measurementId: "G-Z64J1TLZTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
/* firestore().settings({ experimentalForceLongPolling: true });
 */
export async function addFilm(title, release, cast, directors, synopsis){
  addDoc(collection(db, "films"), {
    title: title,
    release: release,
    cast: cast,
    directors: directors,
    synopsis: synopsis
/*     likes: 0,
    dislikes: 0 */
  });
  setTimeout(function () {
        window.location.reload();
    }, 500);
}

/* export async function updateLikes(film, like){
  if(like > 0){
    await updateDoc(film,{likes: increment(like)})
  } else {
    await updateDoc(film,{dislikes: increment(like)})
  }
} */

export async function showStuff(){
  const docRef = collection(db, "films");
  const docSnap = await getDocs(docRef);
  const docList = docSnap.docs.map(doc => doc.data());
  console.log(docList)
  return docList

/*   const cities = [];
  const q = query(collection(db, "films"));
  onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  });
  console.log(cities)
  return cities */
}


//uploadBytes(ref(storage, `images/${files[0].name}`), files[0])
//firestoreLogLevel("debug");

export const db = getFirestore(app, { useFetchStreams: false, experimentalAutoDetectLongPolling: true }); 