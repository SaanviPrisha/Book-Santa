import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBhIsI-2OwTrYk11jfhmGdbB2aLNWZ7QiQ",
    authDomain: "book-santa-475ec.firebaseapp.com",
    projectId: "book-santa-475ec",
    storageBucket: "book-santa-475ec.appspot.com",
    messagingSenderId: "560116518427",
    appId: "1:560116518427:web:bbefc6de9cb5825009b2be"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()