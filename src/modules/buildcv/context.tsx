import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../../library";
import { ICV } from "./model";

interface ICvState {
  cvState: ICV;
  getCVDocument: () => void;
  updateCVDocument: (response: any) => Promise<any>;
}
const CVContext = createContext<ICvState>({
  cvState: null as any,
  getCVDocument() {},
  updateCVDocument(response) {
    return null as any;
  },
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

  const updateCVDocument = async (response: any) => {
    const user: any = auth.currentUser;
    const cvDocRef = doc(db, "cv", user.uid);
    const cvSnapShot = await updateDoc(cvDocRef, response).then((res: any) => {
      console.log(res);
      const update = res;
      if (update) {
        setCvState({ ...cvState, update });
      }
      return update;
    });
    console.log(cvSnapShot);
  };
  return (
    <CVContext.Provider value={{ cvState, getCVDocument, updateCVDocument }}>
      {children}
    </CVContext.Provider>
  );
};
