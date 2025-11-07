import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBFFzwDdZVU1woXwOiAIGzp8E72S1IT1bA",
    authDomain: "hw3httprequest.firebaseapp.com",
    projectId: "hw3httprequest",
    storageBucket: "hw3httprequest.firebasestorage.app",
    messagingSenderId: "767160663573",
    appId: "1:767160663573:web:de085eb727b24b3e55181c",
    measurementId: "G-02WCJ0T1EC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
