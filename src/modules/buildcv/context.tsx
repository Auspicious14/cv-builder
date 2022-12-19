import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { db } from "../../library";

interface ICvState {
  createCVDocument: (response: any) => void;
}
const CVContext = createContext<ICvState>({
  createCVDocument(response) {
    return {} as any;
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
  const createCVDocument = async (response: any) => {
    const cvDocRef = doc(collection(db, "cv"));
    const cvSnapShot = await getDoc(cvDocRef);

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
    <CVContext.Provider value={{ createCVDocument }}>
      {children}
    </CVContext.Provider>
  );
};
