var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyCtCQXKeaDMgB82gS7oSQigLpC1C7ctHTo",
  authDomain: "cision-feedback.firebaseapp.com",
  databaseURL: "https://cision-feedback.firebaseio.com",
  storageBucket: "cision-feedback.appspot.com",
  messagingSenderId: "1051446450630"
};
  
firebase.initializeApp(config);

module.exports = firebase;