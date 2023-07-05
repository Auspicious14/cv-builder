import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../../library";
import { toastSvc } from "../../services/toast";
import { apiReqHandler } from "../../components";

interface ILanguageState {
  loading: boolean;
  updateCVDocument: (response: any, id: string) => Promise<any>;
}
const LanguageContext = createContext<ILanguageState>({
  loading: false,
  updateCVDocument(response) {
    return {} as any;
  },
});

export const useLanguageState = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const LanguageContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

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
        toastSvc.success("Language created");
        console.log(data);
        return data;
      }
    } catch (error: any) {
      toastSvc.error(error);
    }
  };
  return (
    <LanguageContext.Provider value={{ updateCVDocument, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
