import React, { useState } from "react";
import { apiReqHandler } from "../../../components";
import { toast } from "react-toastify";

interface IVerifyState {
  loading: boolean;
  handleVerifyOTP: (user: any) => Promise<void>;
}

const VerifyOTPContext = React.createContext<IVerifyState>({
  loading: false,
  handleVerifyOTP(user) {
    return null as any;
  },
});

export const useVerifyOTPState = () => {
  const context = React.useContext(VerifyOTPContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const VerifyOTPContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerifyOTP = async (params: any) => {
    setLoading(true);
    console.log(JSON.stringify(params));
    try {
      const response = await apiReqHandler({
        endPoint: `http://${process.env.NEXT_PUBLIC_API_ROUTE}/auth/verify`,
        method: "POST",
        payload: JSON.stringify(params),
      });
      setLoading(false);
      const data = await response.res?.data;
      console.log(data);
      toast.success(data?.message);
      console.log(data);
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <VerifyOTPContext.Provider value={{ handleVerifyOTP, loading }}>
      {children}
    </VerifyOTPContext.Provider>
  );
};
