// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as authen from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrgFgAUdDm3oc7rOaHrGSQnyDegoHIsUg",
  authDomain: "datn-29af1.firebaseapp.com",
  projectId: "datn-29af1",
  storageBucket: "datn-29af1.appspot.com",
  messagingSenderId: "978320784698",
  appId: "1:978320784698:web:47e6080430d5e96dab6403",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = authen;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
