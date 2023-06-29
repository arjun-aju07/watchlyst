// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, where, getDocs } from 'firebase/firestore'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDHpZeqJ6-YVUTgUeJF9R6uF8U2t31kO_o',
    authDomain: 'watchlyst-21.firebaseapp.com',
    projectId: 'watchlyst-21',
    storageBucket: 'watchlyst-21.appspot.com',
    messagingSenderId: '736828880047',
    appId: '1:736828880047:web:9a893952067da90715d05a'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export {
    db,
    collection,
    onSnapshot,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
    where,
    // Auth related exports
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}