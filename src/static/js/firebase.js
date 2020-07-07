// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/firebase-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpKsT_qkVxrmL10R8TxkXZ3-Ez66UYcVo",
  authDomain: "wowmusic-310c5.firebaseapp.com",
  databaseURL: "https://wowmusic-310c5.firebaseio.com",
  projectId: "wowmusic-310c5",
  storageBucket: "wowmusic-310c5.appspot.com",
  messagingSenderId: "829323906474",
  appId: "1:829323906474:web:860f18b04b17d00dae2fd3",
  measurementId: "G-NB16K6HZC5"
};

firebase.initializeApp(firebaseConfig);
// Initialize Firestore
let db = firebase.firestore();
let storage = firebase.storage();

export { db, firebase, storage }

