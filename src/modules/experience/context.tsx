import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { auth, db } from "../../library";

interface ExperienceState {
  updateCVDocument: (response: any) => Promise<any>;
}
const ExperienceContext = createContext<ExperienceState>({
  updateCVDocument(response) {
    return {} as any;
  },
});

export const useExperienceState = () => {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const ExperienceContextProvider: React.FC<IProps> = ({ children }) => {
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
    <ExperienceContext.Provider value={{ updateCVDocument }}>
      {children}
    </ExperienceContext.Provider>
  );
};
