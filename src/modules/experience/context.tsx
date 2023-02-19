import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db, useOpenAiApi } from "../../library";

interface ExperienceState {
  category: string;
  loading: boolean;
  fetchLoading: boolean;
  error: any;
  result: any;
  load: boolean;
  getDescriptiveAiInfo: (prompt: string) => void;
  handleSetCategory: (e: any) => void;
  setResult: React.Dispatch<any>;
  updateCVDocument: (response: any) => Promise<any>;
}
const ExperienceContext = createContext<ExperienceState>({
  category: "",
  loading: false,
  fetchLoading: false,
  error: null,
  result: null,
  getDescriptiveAiInfo() {},
  handleSetCategory() {},
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
  const [description, setDescription] = useState("");
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
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

  const handleSetCategory = () => setCategory(category);

  const {
    loading: load,
    error,
    result,
    setResult,
    // getDescriptiveAiInfo,
  } = useOpenAiApi(`Describe my experience as a ${category}`);

  const getDescriptiveAiInfo = async (prompt: string) => {
    setFetchLoading(true);
    const response = await fetch("/api/open-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: prompt }),
    });

    try {
      setFetchLoading(false);
      const data = await response.json();
      setDescription(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ExperienceContext.Provider
      value={{
        updateCVDocument,
        loading,
        fetchLoading,
        load,
        error,
        category,
        result,
        setResult,
        getDescriptiveAiInfo,
        handleSetCategory,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};
