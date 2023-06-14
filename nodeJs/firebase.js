import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr3LmDfqmszkBFOsWL1k27OjQOsPzVFt8",
  authDomain: "projectndn-e-health.firebaseapp.com",
  projectId: "projectndn-e-health",
  storageBucket: "projectndn-e-health.appspot.com",
  messagingSenderId: "379889566038",
  appId: "1:379889566038:web:c324c08f10a9523198d6f7",
  measurementId: "G-Y8FH7QESVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);