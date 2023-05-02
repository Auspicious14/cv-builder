import React, { useState } from "react";
import { apiReqHandler } from "../../../components";
import { toast } from "react-toastify";

interface IForgetPasswordState {
  loading: boolean;
  handleForgetPassword: (user: any) => Promise<void>;
}

const ForgetPasswordContext = React.createContext<IForgetPasswordState>({
  loading: false,
  handleForgetPassword(user) {
    return null as any;
  },
});

export const useForgetPasswordState = () => {
  const context = React.useContext(ForgetPasswordContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ForgetPasswordContextProvider: React.FC<IProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleForgetPassword = async (email: string) => {
    setLoading(true);
    console.log(JSON.stringify(email));
    try {
      const response = await apiReqHandler({
        endPoint: `http://${process.env.NEXT_PUBLIC_API_ROUTE}/auth/forget`,
        method: "POST",
        payload: JSON.stringify(email),
      });
      setLoading(false);
      const data = await response.res?.data;
      console.log(data);
      toast.success(data.message);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <ForgetPasswordContext.Provider value={{ handleForgetPassword, loading }}>
      {children}
    </ForgetPasswordContext.Provider>
  );
};
