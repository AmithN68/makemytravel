// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// !authentication
import { getAuth } from "firebase/auth";
// !firebase database
import { getFirestore } from 'firebase/firestore';
// !firebase storage
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxAAOmBX83Vz07CWQTIrYZMKN7nvX27Mw",
  authDomain: "makemytravel-d8c60.firebaseapp.com",
  projectId: "makemytravel-d8c60",
  storageBucket: "makemytravel-d8c60.appspot.com",
  messagingSenderId: "194478719397",
  appId: "1:194478719397:web:8ff5498cfc74bf014d684c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export let auth = getAuth(firebaseApp);
export let database = getFirestore(firebaseApp);
export let storage = getStorage(firebaseApp);

export default firebaseApp;
