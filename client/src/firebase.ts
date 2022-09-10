import { getStorage } from "firebase/storage";
import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
   apiKey: process.env.REACT_APP_APIKEY,
   authDomain: process.env.REACT_APP_AUTHDOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const storage = getStorage();
export default app;
