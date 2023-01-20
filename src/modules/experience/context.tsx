import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db, useOpenAiApi } from "../../library";

interface ExperienceState {
  category: string;
  loading: boolean;
  error: any;
  result: any;
  load: boolean;
  getDescriptiveAiInfo: () => void;
  setResult: React.Dispatch<any>;
  updateCVDocument: (response: any) => Promise<any>;
}
const ExperienceContext = createContext<ExperienceState>({
  category: "",
  loading: false,
  error: null,
  result: null,
  getDescriptiveAiInfo() {},
  setResult() {},
  load: false,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState("");
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

  const {
    loading: load,
    error,
    result,
    setResult,
    getDescriptiveAiInfo,
  } = useOpenAiApi(`Describe my experience as a ${category}`);

  return (
    <ExperienceContext.Provider
      value={{
        updateCVDocument,
        loading,
        load,
        error,
        category,
        result,
        setResult,
        getDescriptiveAiInfo,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};
