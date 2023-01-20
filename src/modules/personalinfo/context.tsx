import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../../library";

interface IPersonalInfoState {
  loading: boolean;
  getUser: any;
  getUserFunc: () => Promise<void>;
  createCVDocument: (response: any) => Promise<any>;
  updateCVDocument: (response: any) => Promise<any>;
}
const PersonalInfoContext = createContext<IPersonalInfoState>({
  loading: false,
  getUser: {},
  getUserFunc() {
    return null as any;
  },
  createCVDocument(response) {
    return {} as any;
  },
  updateCVDocument(response) {
    return {} as any;
  },
});

export const usePersonalInfoState = () => {
  const context = useContext(PersonalInfoContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const PersonalInfoContextProvider: React.FC<IProps> = ({ children }) => {
  const [getUser, setGetUser] = useState<any>({});
  const user: any = auth.currentUser;
  const [loading, setLoading] = useState<boolean>(false);

  const createCVDocument = async (response: any) => {
    setLoading(true);
    const cvDocRef = doc(db, "cv", user.uid);
    const cvSnapShot = await getDoc(cvDocRef);
    if (!cvSnapShot.exists()) {
      try {
        setLoading(false);
        await setDoc(cvDocRef, response).then((res) => console.log(res));
      } catch (err) {
        console.log(err);
      }
    }
    return cvDocRef;
  };

  const getUserFunc = async () => {
    const getAUser = doc(db, "users", user.uid);
    const userSnapShot = await getDoc(getAUser);
    if (userSnapShot.exists()) {
      setGetUser(userSnapShot.data());
    }
  };
  const updateCVDocument = async (response: any) => {
    const cvDocRef = doc(db, "cv", user.uid);
    const cvSnapShot = await updateDoc(cvDocRef, { response }).then(
      (res) => {}
    );
  };
  return (
    <PersonalInfoContext.Provider
      value={{
        loading,
        createCVDocument,
        updateCVDocument,
        getUser,
        getUserFunc,
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};
