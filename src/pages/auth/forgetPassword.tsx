import React from "react";
import { ForgetPasswordContextProvider } from "../../modules/auth/forgetPassword/context";
import { ForgetPasswordPage } from "../../modules/auth/forgetPassword/page";

const ForgetPassword = () => {
  return (
    <ForgetPasswordContextProvider>
      <ForgetPasswordPage />
    </ForgetPasswordContextProvider>
  );
};

export default ForgetPassword;
