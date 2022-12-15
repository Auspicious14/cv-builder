import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1_77_OpnV3SXb0UJe2PYZGLpPyjE4HwM",
  authDomain: "cv-builder-c7420.firebaseapp.com",
  projectId: "cv-builder-c7420",
  storageBucket: "cv-builder-c7420.appspot.com",
  messagingSenderId: "614293657493",
  appId: "1:614293657493:web:f8d081411d15f6cf35c89c",
  measurementId: "G-TYGSPJ1ZWF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export const signUpUser = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};
