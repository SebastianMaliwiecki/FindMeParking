import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBykekRE80eljhsRzswRfPeIt7QPs-8Lk0",
    authDomain: "findmeparking-1d00b.firebaseapp.com",
    projectId: "findmeparking-1d00b",
    storageBucket: "findmeparking-1d00b.appspot.com",
    messagingSenderId: "840033870308",
    appId: "1:840033870308:web:aee4df1bce2c586e8927f1"
});

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage(firebaseApp);