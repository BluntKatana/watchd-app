import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxFkuhHoD2dgAdXB4wAHof4LjAuoP764A",
  authDomain: "watchd-3f02c.firebaseapp.com",
  projectId: "watchd-3f02c",
  storageBucket: "watchd-3f02c.appspot.com",
  messagingSenderId: "1016320188587",
  appId: "1:1016320188587:web:90e93b9d72a7790c0e17ee",
  measurementId: "G-5533CTS56V",
};

// Initialize Firebase
if (!firebase.apps?.length) firebase.initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };

const db = getFirestore();
export { db };
export { firebase };
