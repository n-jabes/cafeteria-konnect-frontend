// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAMBdZfhfymR0wauKurcr6jeUEbt0-cQpg",
    authDomain: "cafeteriakonnect.firebaseapp.com",
    databaseURL: "https://cafeteriakonnect-default-rtdb.firebaseio.com",
    projectId: "cafeteriakonnect",
    storageBucket: "cafeteriakonnect.appspot.com",
    messagingSenderId: "575180383147",
    appId: "1:575180383147:web:62b3eb02ee49f1fec3a8ee",
    measurementId: "G-EV6C9X3RMH"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };