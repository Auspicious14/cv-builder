import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../../library";

interface IAcademyState {
  loading: boolean;
  updateCVDocument: (response: any) => Promise<any>;
}
const AcademyContext = createContext<IAcademyState>({
  loading: false,
  updateCVDocument(response) {
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
  const [loading, setLoading] = useState<boolean>(false);

  const updateCVDocument = async (response: any) => {
    setLoading(true);
    const user: any = auth.currentUser;
    const cvDocRef = doc(db, "cv", user.uid);
    try {
      setLoading(false);
      await updateDoc(cvDocRef, response).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AcademyContext.Provider value={{ updateCVDocument, loading }}>
      {children}
    </AcademyContext.Provider>
  );
};
