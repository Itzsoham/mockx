import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDO6Oml4DrRnkXTqUTvQGpzn3GTQpXHbgI",
  authDomain: "mockx-f4af0.firebaseapp.com",
  projectId: "mockx-f4af0",
  storageBucket: "mockx-f4af0.firebasestorage.app",
  messagingSenderId: "1014564473953",
  appId: "1:1014564473953:web:fb988b399ef1e75e35ae20",
  measurementId: "G-WT2PF98QFB",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
