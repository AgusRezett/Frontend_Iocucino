// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBX6PvQS8Z-WSMirzmx32mLLXO9-VyleQE",
    authDomain: "mino-14808.firebaseapp.com",
    projectId: "mino-14808",
    storageBucket: "mino-14808.appspot.com",
    messagingSenderId: "537945922970",
    appId: "1:537945922970:web:0bfb66e09228845415ae23"
};

// Initialize Firebase
let app
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.apps();
}

const auth = firebase.auth();

export { auth, firebase };

