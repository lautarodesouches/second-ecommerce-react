// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ4EZunacPGu6X4dsCo2hORY1FYrxTVXw",
  authDomain: "other-ecommerce-react.firebaseapp.com",
  projectId: "other-ecommerce-react",
  storageBucket: "other-ecommerce-react.appspot.com",
  messagingSenderId: "132154121606",
  appId: "1:132154121606:web:6922d8d74b295d18ca2007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;