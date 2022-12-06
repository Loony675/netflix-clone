import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAE8OC9OSBeJtTw9V-Ez_J_IpTkSxRX1tU",
  authDomain: "netflix-clone-18ba4.firebaseapp.com",
  projectId: "netflix-clone-18ba4",
  storageBucket: "netflix-clone-18ba4.appspot.com",
  messagingSenderId: "831094249260",
  appId: "1:831094249260:web:e163a1cdfe70e013e8be89",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

