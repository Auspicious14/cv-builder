import React, { useState } from "react";
import { apiReqHandler } from "../../../components";
import { toast } from "react-toastify";

interface IResetPasswordState {
  loading: boolean;
  handleResetPassword: (params: any) => Promise<void>;
  handleUpdatePassword: (params: any) => Promise<void>;
}

const ResetPasswordContext = React.createContext<IResetPasswordState>({
  loading: false,
  handleResetPassword(params) {
    return null as any;
  },
  handleUpdatePassword(params) {
    return null as any;
  },
});

export const useResetPasswordState = () => {
  const context = React.useContext(ResetPasswordContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ResetPasswordContextProvider: React.FC<IProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (params: any) => {
    setLoading(true);
    console.log(JSON.stringify(params));
    try {
      const response = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/reset`,
        method: "POST",
        payload: JSON.stringify(params),
      });
      setLoading(false);
      const data = await response.res?.data;
      console.log(data);
      toast.success(data.message);
      console.log(data);
      return data;
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };
  const handleUpdatePassword = async (params: any) => {
    setLoading(true);
    console.log(JSON.stringify(params));
    try {
      const response = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/update/password`,
        method: "POST",
        payload: JSON.stringify(params),
      });
      setLoading(false);
      const data = await response.res?.data;
      if (data) {
        toast.success("Password Updated");
        console.log(data);
      }
      console.log(data);
      return data;
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <ResetPasswordContext.Provider
      value={{ handleResetPassword, handleUpdatePassword, loading }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
};
