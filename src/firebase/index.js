import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB-d6LENjhTecZTxyV-hxlMhNoNVifMzgw",
  authDomain: "vue-app-b99b1.firebaseapp.com",
  projectId: "vue-app-b99b1",
  storageBucket: "vue-app-b99b1.appspot.com",
  messagingSenderId: "207830929755",
  appId: "1:207830929755:web:69756cac75a47f67824a7e",
  measurementId: "G-NS15XS6378"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Iniciar firestore Service
const db = getFirestore(app)
export {
  db
}

