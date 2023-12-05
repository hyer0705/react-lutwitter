import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACwA7y3qBTXTdHgec50xEPm1qBB6_nO5c",
  authDomain: "react-lutwitter.firebaseapp.com",
  projectId: "react-lutwitter",
  storageBucket: "react-lutwitter.appspot.com",
  messagingSenderId: "26051626990",
  appId: "1:26051626990:web:a114e9ebc3fd01162330ff",
  measurementId: "G-VCMHCWGQ7N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
