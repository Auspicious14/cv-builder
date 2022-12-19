import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { db } from "../../library";

interface IPersonalInfoState {
  createCVDocument: (response: any) => void;
}
const PersonalInfoContext = createContext<IPersonalInfoState>({
  createCVDocument(response) {
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
  const createCVDocument = async (response: any) => {
    const cvDocRef = doc(collection(db, "cv"));
    const cvSnapShot = await getDoc(cvDocRef);
    console.log(cvDocRef);
    console.log(cvSnapShot);
    if (!cvSnapShot.exists()) {
      try {
        await setDoc(cvDocRef, { response });
      } catch (err) {
        console.log(err);
      }
    }
    return cvDocRef;
  };
  return (
    <PersonalInfoContext.Provider value={{ createCVDocument }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};
