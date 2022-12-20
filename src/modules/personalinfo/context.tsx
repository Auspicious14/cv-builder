import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { auth, db } from "../../library";

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
    const user: any = auth.currentUser;
    const cvDocRef = doc(db, "cv", user.uid);
    const cvSnapShot = await getDoc(cvDocRef);
    if (!cvSnapShot.exists()) {
      try {
        await setDoc(cvDocRef, response).then((res) => console.log(res));
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
