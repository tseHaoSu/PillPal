import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Auth service functions
const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};


// Export everything
export {
  firebaseApp,
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  login,
  logout,
  getAuth,
  onAuthStateChanged,
};