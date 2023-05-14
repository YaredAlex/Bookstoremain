import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "fir-2-7c2e8.firebaseapp.com",
    projectId: "fir-2-7c2e8",
    storageBucket: "fir-2-7c2e8.appspot.com",
    messagingSenderId: "890934481757",
    appId: "1:890934481757:web:04f48a69960cdba470ceb4",
    measurementId: "G-NZ7SD6Y17T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
export { app }