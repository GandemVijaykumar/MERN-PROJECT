// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "realestatemern-55ae5.firebaseapp.com",
  projectId: "realestatemern-55ae5",
  storageBucket: "realestatemern-55ae5.appspot.com",
  messagingSenderId: "330453809260",
  appId: "1:330453809260:web:cfdce1532a746de5b80049"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);