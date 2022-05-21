// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbXqWEDbnTfYE6wNgEb1olnI_qm7iVM1U",
    authDomain: "mino-51761.firebaseapp.com",
    databaseURL: "https://mino-51761-default-rtdb.firebaseio.com",
    projectId: "mino-51761",
    storageBucket: "mino-51761.appspot.com",
    messagingSenderId: "948877004741",
    appId: "1:948877004741:web:bb808f646d70890d9885ac",
    measurementId: "G-8V52YDWE7L"
};

// Initialize Firebase
let app
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.apps();
}

const auth = firebase.auth();

export { auth };