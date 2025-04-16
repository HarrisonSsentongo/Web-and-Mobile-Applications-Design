// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Removed unused import for getAnalytics
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyCYXrboMqbDSCWaOV9T3nWy_ayNdMDj8",
  authDomain: "bookstore-8f008.firebaseapp.com",
  projectId: "bookstore-8f008",
  storageBucket: "bookstore-8f008.firebasestorage.app",
  messagingSenderId: "597020702971",
  appId: "1:597020702971:web:5cf6d4d9ae144971d9585e",
  measurementId: "G-VQL8S9698G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export default app;