import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTZ1WtJDi_s5iWJ1pAhXAoixL4JgSrBw0",
  authDomain: "cz-database.firebaseapp.com",
  projectId: "cz-database",
  storageBucket: "cz-database.appspot.com",
  messagingSenderId: "864814132318",
  appId: "1:864814132318:web:a4cf04dc408cba94f818cf",
  measurementId: "G-B8BGQ0N0CX"
};


const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db;
