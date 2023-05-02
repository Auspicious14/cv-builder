import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db, useOpenAiApi } from "../../library";
import { toastSvc } from "../../services/toast";
import { apiReqHandler } from "../../components";

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
  updateCVDocument: (response: any, id: string) => Promise<any>;
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
  const updateCVDocument = async (payload: any, id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/cv/${id}`,
        method: "POST",
        payload,
      });

      setLoading(false);
      if (res?.res?.data?.success === true) {
        const data = res?.res?.data?.data;
        toastSvc.success("Academy created");
        console.log(data);
        return data;
      }
    } catch (error: any) {
      toastSvc.error(error);
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
