import { initializeApp } from "firebase/app";

// auth
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from 'firebase/auth'

// db
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB_fu3y1j6diFRKV7hIUHwePiDr8gavAuU",
  authDomain: "projetointegrador-42949.firebaseapp.com",
  projectId: "projetointegrador-42949",
  storageBucket: "projetointegrador-42949.appspot.com",
  messagingSenderId: "169465448367",
  appId: "1:169465448367:web:cf87f956880f1df497d15a",
  measurementId: "G-2L32GKN6VW"
};

// iniciar sdk
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// db
export const db = getFirestore(app);

// storage
export const storage = getStorage(app);