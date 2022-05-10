	// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, getFirestore, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

// get the firebase auth object
export const auth = getAuth(app);

export async function addFilm(title, release, cast, directors, synopsis, files, id, email){
  const doc = await addDoc(collection(db, "films"), {
    title: title,
    release: release,
    cast: cast,
    directors: directors,
    synopsis: synopsis,
    likes: 0,
    dislikes: 0,
    user_id: id,
    user_email: email,
    favorited_by: []
  });
  console.log(doc.id)
  const imgRef = ref(storage, `images/${doc.id}.jpeg`);
  await uploadBytes(imgRef, files[0])
}

export async function addFavorite(user_id, film_id){
  const favRef = doc(db, 'films', film_id)
  await setDoc(favRef, {favorited_by: arrayUnion(user_id)}, {merge:true});
}

export async function removeFavorite(user_id, film_id){
  const favRef = doc(db, 'films', film_id)
  await setDoc(favRef, {favorited_by: arrayRemove(user_id)}, {merge:true});
}

function matchYoutubeUrl(url){
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
   return (url.match(p)) ? RegExp.$1 : false ;
  }

export async function addTrailer(film_id, link){
  const filmRef = doc(db, 'films', film_id)
  const youtube_id = matchYoutubeUrl(link)
  await setDoc(filmRef, {trailer: youtube_id}, {merge:true});
};

//firestoreLogLevel("debug");

export const db = getFirestore(app, { useFetchStreams: false, experimentalAutoDetectLongPolling: true }); 