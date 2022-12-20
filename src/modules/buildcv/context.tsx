import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../../library";
import { ICV } from "./model";

interface ICvState {
  cvState: ICV;
  getCVDocument: () => void;
}
const CVContext = createContext<ICvState>({
  cvState: null as any,
  getCVDocument() {},
});

export const useCvState = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const CVContetxProvider: React.FC<IProps> = ({ children }) => {
  const [cvState, setCvState] = useState<ICV>() as any;
  const getCVDocument = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cvDocRef = doc(db, "cv", user.uid);
        const cvSnapShot = await getDoc(cvDocRef);
        if (cvSnapShot.exists()) {
          console.log(cvSnapShot.data(), "cv dataaaaaa");
          setCvState(cvSnapShot.data() as any);
        }
        return cvDocRef;
      }
    });
  };
  return (
    <CVContext.Provider value={{ cvState, getCVDocument }}>
      {children}
    </CVContext.Provider>
  );
};
