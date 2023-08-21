import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZyutPWKcdVtIU5XJA4gekgzxNUeFUPjo",
  authDomain: "next-auth-test-ea34d.firebaseapp.com",
  projectId: "next-auth-test-ea34d",
  storageBucket: "next-auth-test-ea34d.appspot.com",
  messagingSenderId: "940246737639",
  appId: "1:940246737639:web:ba6c8ba4ab4602a1e33842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
