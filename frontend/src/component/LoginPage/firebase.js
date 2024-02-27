// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4OgtneaDMDJJxNa5OkKuRBFD3o62WoMo",
  authDomain: "inbulk-7777.firebaseapp.com",
  projectId: "inbulk-7777",
  storageBucket: "inbulk-7777.appspot.com",
  messagingSenderId: "331609129631",
  appId: "1:331609129631:web:0175ec9ea6e396e5bc98aa",
  measurementId: "G-WFWYGQN509"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);