// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQmNZ8M9wQ7akdM-oicjbA7h7jaXCCAEA",
  authDomain: "react-curso-dd7ff.firebaseapp.com",
  projectId: "react-curso-dd7ff",
  storageBucket: "react-curso-dd7ff.firebasestorage.app",
  messagingSenderId: "1094630857879",
  appId: "1:1094630857879:web:4629f78a8b3eb9658e9dd2",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Auth and DB
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
