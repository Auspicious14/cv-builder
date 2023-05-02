import React from "react";
import { VerifyOTPContextProvider } from "../../modules/auth/verifyOTP/context";
import { VerifyOTPPage } from "../../modules/auth/verifyOTP/page";

const VerifyOTP = () => {
  return (
    <VerifyOTPContextProvider>
      <VerifyOTPPage />
    </VerifyOTPContextProvider>
  );
};

export default VerifyOTP;
