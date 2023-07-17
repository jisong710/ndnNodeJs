import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdf0eJDJtvzDMETzRVTqKcMd8AiCoy5Bc",
  authDomain: "ndn-firebase-cubit.firebaseapp.com",
  projectId: "ndn-firebase-cubit",
  storageBucket: "ndn-firebase-cubit.appspot.com",
  messagingSenderId: "196545797939",
  appId: "1:196545797939:web:fddf3935dcaabba2b72846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;