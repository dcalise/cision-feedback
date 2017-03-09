// Firebase
var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtCQXKeaDMgB82gS7oSQigLpC1C7ctHTo",
    authDomain: "cision-feedback.firebaseapp.com",
    databaseURL: "https://cision-feedback.firebaseio.com",
    storageBucket: "cision-feedback.appspot.com",
    messagingSenderId: "1051446450630"
  };
  firebase.initializeApp(config);

// Initialize the default app
var defaultApp = firebase.initializeApp(defaultAppConfig);

console.log(defaultApp.name);  // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
var defaultStorage = defaultApp.storage();
var defaultDatabase = defaultApp.database();

// ... or you can use the equivalent shorthand notation
defaultStorage = firebase.storage();
defaultDatabase = firebase.database();