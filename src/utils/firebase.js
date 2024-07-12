// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOqio-eoV78lEhwsy24mFMxAFFQ3FYHU8",
  authDomain: "cafeteria-konnect-prod.firebaseapp.com",
  databaseURL: "https://cafeteria-konnect-prod-default-rtdb.firebaseio.com",
  projectId: "cafeteria-konnect-prod",
  storageBucket: "cafeteria-konnect-prod.appspot.com",
  messagingSenderId: "1043139937955",
  appId: "1:1043139937955:web:ff570e14ab8b0168672116",
  measurementId: "G-VQK9PQS9R4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestoreDB = getFirestore(app);

export { database, firestoreDB };