import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useFirebaseApp, useFirebaseAuth, useFirestore } from "vuefire";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnAsbps9ZhMvkHz-nQFq1fkCxdWAa_5Fc",
  authDomain: "fit5032-79317.firebaseapp.com",
  projectId: "fit5032-79317",
  storageBucket: "fit5032-79317.appspot.com",
  messagingSenderId: "422794500475",
  appId: "1:422794500475:web:946ef7c6be4d4bffe545de",
  measurementId: "G-MYSJ8JYT7H",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export {
  firebaseApp,
  auth,
  db,
  createUserWithEmailAndPassword,
  useFirebaseApp,
  useFirebaseAuth,
  useFirestore,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
};
