	// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
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
    user_email: email
  });
  console.log(doc.id)
  const imgRef = ref(storage, `images/${doc.id}.jpeg`);
  await uploadBytes(imgRef, files[0])
}

export async function showStuff(sortF){
  const docRef = collection(db, "films");
  //const docSnap = await getDocs(docRef)
  const q = query(docRef, orderBy("title"))

  const docSnap = await getDocs(q)
  let docList = []
  /* const docList = docSnap.docs.map(doc => {
    return {...doc.data(), id:doc.id}
  }); */
  docSnap.forEach((doc) => {
    docList.push({id:doc.id, ...doc.data()})
  })

  console.log(docList)
  return docList.sort(sortF)
}

//w.i.p. -> this shit function below
export async function showStuff2(){
  const docRef = collection(db, "films");
  let docList = [];
  let flag;
  flag = true
  return new Promise((resolve, reject) => {
    const unsub = onSnapshot(docRef, (querySnapshot) =>{
    
      querySnapshot.forEach((doc) => {
        docList.push({id:doc.id, ...doc.data()});
        resolve()
      });
      /* return {id:doc.id, ...doc.data()} */
    });
    /* const docList = docSnap.docs.map(doc => {
      return {id:doc.id, ...doc.data()}
    }); */
  
    console.log(docList)
    return docList
  });
  /* const docSnap = await getDocs(docRef) */
  
}

//firestoreLogLevel("debug");

export const db = getFirestore(app, { useFetchStreams: false, experimentalAutoDetectLongPolling: true }); 