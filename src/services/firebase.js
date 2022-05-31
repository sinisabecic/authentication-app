import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1WSK9va0ebShCnTl5pin4w5TgmxzQSIk",
  authDomain: "react-auth-6ece0.firebaseapp.com",
  projectId: "react-auth-6ece0",
  storageBucket: "react-auth-6ece0.appspot.com",
  messagingSenderId: "1043191982759",
  appId: "1:1043191982759:web:79dcec04b82882b3978982",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
