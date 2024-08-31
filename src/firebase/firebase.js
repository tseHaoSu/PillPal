import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCnAsbps9ZhMvkHz-nQFq1fkCxdWAa_5Fc",
  authDomain: "fit5032-79317.firebaseapp.com",
  projectId: "fit5032-79317",
  storageBucket: "fit5032-79317.appspot.com",
  messagingSenderId: "422794500475",
  appId: "1:422794500475:web:946ef7c6be4d4bffe545de",
  measurementId: "G-MYSJ8JYT7H",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
};
