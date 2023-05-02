import React from "react";
import { SignUpPage } from "../../../modules/auth/signup/page";
import { SignUpContextProvider } from "../../../modules/auth/signup/context";

const SignUp = () => {
  return (
    <SignUpContextProvider>
      <SignUpPage />
    </SignUpContextProvider>
  );
};

export default SignUp;
