// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js';
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBez6BmymCOil4cZggw33AT_3WXcmj9QMc",
    authDomain: "fir-project-55d21.firebaseapp.com",
    databaseURL: "https://fir-project-55d21-default-rtdb.firebaseio.com",
    projectId: "fir-project-55d21",
    storageBucket: "fir-project-55d21.appspot.com",
    messagingSenderId: "599313505187",
    appId: "1:599313505187:web:bc03cf129c32a800f25816",
    measurementId: "G-GEF6BMSXJ5"
  };
// Initialize Firebase
const firebaseInit = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(firebaseInit);
const db = getDatabase(firebaseInit);

