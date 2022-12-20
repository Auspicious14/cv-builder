import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { auth, db } from "../../library";

interface IAcademyState {
  createCVDocument: (response: any) => void;
}
const AcademyContext = createContext<IAcademyState>({
  createCVDocument(response) {
    return {} as any;
  },
});

export const useAcademyState = () => {
  const context = useContext(AcademyContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const AcademyContextProvider: React.FC<IProps> = ({ children }) => {
  const createCVDocument = async (response: any) => {
    const user: any = auth.currentUser;
    const cvDocRef = doc(db, "cv", user.uid);
    try {
      await updateDoc(cvDocRef, response).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AcademyContext.Provider value={{ createCVDocument }}>
      {children}
    </AcademyContext.Provider>
  );
};
