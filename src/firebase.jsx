import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDRnQU4-GWX7nF8m0ZAHNt_8fm8tO9a5hw",
  authDomain: "fireproject-733a5.firebaseapp.com",
  projectId: "fireproject-733a5",
  storageBucket: "fireproject-733a5.appspot.com",
  messagingSenderId: "412804789019",
  appId: "1:412804789019:web:f21868463a656117ea59be",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
