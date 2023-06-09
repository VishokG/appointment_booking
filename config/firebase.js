import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
    projectId: "homeoamigo",
    storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.FIREBASE_MSG_ID}`,
    appId: `${process.env.FIREBASE_APP_ID}`,
    databaseURL: "https://homeoamigo-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

const fireBaseApp = initializeApp(firebaseConfig);

export default fireBaseApp;