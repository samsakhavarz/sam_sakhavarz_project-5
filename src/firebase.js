import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAiMHOxE8-MzZ2p8r0FN9sP0MvN7DB-h98",
    authDomain: "rock-journal.firebaseapp.com",
    databaseURL: "https://rock-journal.firebaseio.com",
    projectId: "rock-journal",
    storageBucket: "rock-journal.appspot.com",
    messagingSenderId: "524868339629"
};

firebase.initializeApp(config);

export default firebase;
