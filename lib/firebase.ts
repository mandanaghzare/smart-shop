import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcbUzdFMpPHbNsfZUQTvnNbw-vQgNRwEA",
  authDomain: "smart-shop-auth-c9ab9.firebaseapp.com",
  projectId: "smart-shop-auth-c9ab9",
  storageBucket: "smart-shop-auth-c9ab9.firebasestorage.app",
  messagingSenderId: "322345839545",
  appId: "1:322345839545:web:7158a77e711c5fdbfea468",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);