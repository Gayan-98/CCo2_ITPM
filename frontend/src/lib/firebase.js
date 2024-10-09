import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyB-CP9A651b3fUVGsiwMl_Y1dl8SDPDelw",
  authDomain: "chatapp-7a7ba.firebaseapp.com",
  projectId: "chatapp-7a7ba",
  storageBucket: "chatapp-7a7ba.appspot.com",
  messagingSenderId: "293143962716",
  appId: "1:293143962716:web:49df6c222a20f807327299",
};

initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()