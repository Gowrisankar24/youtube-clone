// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCAyRcTQVNH7ndHC0XE1XfAi17NhKhkY38',
    authDomain: 'clone-43600.firebaseapp.com',
    projectId: 'clone-43600',
    storageBucket: 'clone-43600.appspot.com',
    messagingSenderId: '607170439326',
    appId: '1:607170439326:web:60ef3d45a41a825d3b338f',
    measurementId: 'G-M79P6BGEEK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const timestamp = serverTimestamp();
export { app, analytics, db, auth, provider, timestamp };
