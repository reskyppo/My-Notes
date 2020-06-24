import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDqIe63Oa2Dnu-r1Gv57s72y-Zvnqn6Z1Y",
    authDomain: "learn-reactjs-firebase-d6b68.firebaseapp.com",
    databaseURL: "https://learn-reactjs-firebase-d6b68.firebaseio.com",
    projectId: "learn-reactjs-firebase-d6b68",
    storageBucket: "learn-reactjs-firebase-d6b68.appspot.com",
    messagingSenderId: "119435121023",
    appId: "1:119435121023:web:f2942ed109a8cce7eaca4a",
    measurementId: "G-S442H7DM8R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // database
  export const database = firebase.database()
  
  export default firebase;