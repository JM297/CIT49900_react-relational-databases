import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEvtozSvif8pIdFS1-7QPizGt2tmOoLG0",
    authDomain: "class-demo-josh.firebaseapp.com",
    databaseURL: "https://class-demo-josh.firebaseio.com",
    projectId: "class-demo-josh",
    storageBucket: "class-demo-josh.appspot.com",
    messagingSenderId: "532790058567",
    appId: "1:532790058567:web:515741ed2ff1a01dfbdb62"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;