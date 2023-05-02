import React from "react";
import { ResetPasswordContextProvider } from "../../modules/auth/resetPassword/context";
import { ResetPasswordPage } from "../../modules/auth/resetPassword/page";

const ResetPassword = () => {
  return (
    <ResetPasswordContextProvider>
      <ResetPasswordPage />
    </ResetPasswordContextProvider>
  );
};

export default ResetPassword;
