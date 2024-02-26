// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHUTkdxgssqsNrzK5Y6tE3ga8zR32_5sY",
  authDomain: "inbulk-777.firebaseapp.com",
  projectId: "inbulk-777",
  storageBucket: "inbulk-777.appspot.com",
  messagingSenderId: "6946618316",
  appId: "1:6946618316:web:5699e8410f3a70b693fb69",
  measurementId: "G-SE3CKMLGDY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);