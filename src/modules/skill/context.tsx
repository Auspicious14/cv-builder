import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { auth, db } from "../../library";

interface ISkillState {
  createCVDocument: (response: any) => void;
}
const SkillContext = createContext<ISkillState>({
  createCVDocument(response) {
    return {} as any;
  },
});

export const useSkillState = () => {
  const context = useContext(SkillContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const SkillContextProvider: React.FC<IProps> = ({ children }) => {
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
    <SkillContext.Provider value={{ createCVDocument }}>
      {children}
    </SkillContext.Provider>
  );
};
