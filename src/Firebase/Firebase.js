// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzNptxbRljMEoOY9KtcDqdMTXoZ0RaYqU",
  authDomain: "adminpanel-dea1d.firebaseapp.com",
  projectId: "adminpanel-dea1d",
  storageBucket: "adminpanel-dea1d.appspot.com",
  messagingSenderId: "86021717622",
  appId: "1:86021717622:web:719b6e97d163dcb0b9e957",
  measurementId: "G-PLS3FE1WC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

