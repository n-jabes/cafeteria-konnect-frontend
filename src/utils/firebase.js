// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// cafeteria-konnect-prod

// const firebaseConfig = {
//   apiKey: "AIzaSyCOqio-eoV78lEhwsy24mFMxAFFQ3FYHU8",
//   authDomain: "cafeteria-konnect-prod.firebaseapp.com",
//   databaseURL: "https://cafeteria-konnect-prod-default-rtdb.firebaseio.com",
//   projectId: "cafeteria-konnect-prod",
//   storageBucket: "cafeteria-konnect-prod.appspot.com",
//   messagingSenderId: "1043139937955",
//   appId: "1:1043139937955:web:ff570e14ab8b0168672116",
//   measurementId: "G-VQK9PQS9R4"
// };


// cafeteriaKonnect
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
const firestoreDB = getFirestore(app);

export { database, firestoreDB };