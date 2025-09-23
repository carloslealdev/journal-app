// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Dev/Prod
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyARst8AuvF09TNvyjH28wRNlSKisUkVwUc",
//   authDomain: "testing-d4212.firebaseapp.com",
//   projectId: "testing-d4212",
//   storageBucket: "testing-d4212.firebasestorage.app",
//   messagingSenderId: "614826714270",
//   appId: "1:614826714270:web:875d573f9d216a530f478f",
// };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Auth and DB
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
