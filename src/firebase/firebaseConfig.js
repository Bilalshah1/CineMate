// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRRMYfycVZqJNaM-2W_WX4wJxJ3K6uq9A",
    authDomain: "cinemate-2025.firebaseapp.com",
    projectId: "cinemate-2025",
    storageBucket: "cinemate-2025.firebasestorage.app",
    messagingSenderId: "844379759174",
    appId: "1:844379759174:web:f393af0a00bfd0e9f42047"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, googleProvider, storage, db };