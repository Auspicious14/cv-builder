import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { auth, db } from "../../library";

interface ICertificateState {
  updateCVDocument: (response: any) => Promise<any>;
}
const CertificateContext = createContext<ICertificateState>({
  updateCVDocument(response) {
    return {} as any;
  },
});

export const useCertificateState = () => {
  const context = useContext(CertificateContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const CertificateContextProvider: React.FC<IProps> = ({ children }) => {
  const updateCVDocument = async (response: any) => {
    const user: any = auth.currentUser;
    const cvDocRef = doc(db, "cv", user.uid);
    try {
      await updateDoc(cvDocRef, response).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CertificateContext.Provider value={{ updateCVDocument }}>
      {children}
    </CertificateContext.Provider>
  );
};
