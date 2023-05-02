import { doc, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../../library";
import { toastSvc } from "../../services/toast";
import { apiReqHandler } from "../../components";

interface ISkillState {
  loading: boolean;
  updateCVDocument: (response: any, id: string) => Promise<any>;
}
const SkillContext = createContext<ISkillState>({
  loading: false,
  updateCVDocument(response) {
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
        toastSvc.success("Academy created");
        console.log(data);
        return data;
      }
    } catch (error: any) {
      toastSvc.error(error);
    }
  };
  return (
    <SkillContext.Provider value={{ updateCVDocument, loading }}>
      {children}
    </SkillContext.Provider>
  );
};
