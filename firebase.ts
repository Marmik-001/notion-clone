// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5oPWo0iZpPa4U0_NZMvYoZqgqIk5WcOA",
  authDomain: "notion-clone-next.firebaseapp.com",
  projectId: "notion-clone-next",
  storageBucket: "notion-clone-next.firebasestorage.app",
  messagingSenderId: "70806868193",
  appId: "1:70806868193:web:b54d7eeab72e5361cce7a0"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export {db}
