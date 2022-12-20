import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1_77_OpnV3SXb0UJe2PYZGLpPyjE4HwM",
  authDomain: "cv-builder-c7420.firebaseapp.com",
  projectId: "cv-builder-c7420",
  storageBucket: "cv-builder-c7420.appspot.com",
  messagingSenderId: "614293657493",
  appId: "1:614293657493:web:f8d081411d15f6cf35c89c",
  measurementId: "G-TYGSPJ1ZWF",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const signUpUser = async (
  email: string,
  password: string,
  additionalInfo?: any
) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocument(user, additionalInfo);
};

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const signInUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const createUserDocument = async (
  userAuth: any,
  additionalInfo?: any
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userDocRef;
};

export const userProfile = (response: any) => {
  const user = getAuth().currentUser;
  if (user) {
    (response = user?.displayName), user?.email, user?.phoneNumber;
    user?.providerData;
  }

  return { user, response };
};
