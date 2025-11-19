import { initializeApp, getApps  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0s0f8f72Jv_JT64b5YYNQTgW4hKXfqzQ",
  authDomain: "cz-web-app-10bf9.firebaseapp.com",
  databaseURL: "https://cz-web-app-10bf9-default-rtdb.firebaseio.com",
  projectId: "cz-web-app-10bf9",
  storageBucket: "cz-web-app-10bf9.firebasestorage.app",
  messagingSenderId: "1092142917642",
  appId: "1:1092142917642:web:f88de558be3023bef2d7f3",
  measurementId: "G-W2X7067R16"
};

const app = getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApps()[0]; // reuse existing app


export const db = getDatabase(app);

