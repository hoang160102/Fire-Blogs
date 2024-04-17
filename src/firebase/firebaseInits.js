import { initializeApp } from "firebase/app"
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC-taiJptc2fOTNII5_RVjVIyDjFRShtec",
    authDomain: "fireblogsproje.firebaseapp.com",
    projectId: "fireblogsproje",
    storageBucket: "fireblogsproje.appspot.com",
    messagingSenderId: "68372520323",
    appId: "1:68372520323:web:1d9d82fa075f70c7da2ab6"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  // const timestamp = firebase.filestore.FieldValue.serverTimestamp
export default firebaseApp