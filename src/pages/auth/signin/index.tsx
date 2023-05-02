import React from "react";
import { SignInPage } from "../../../modules/auth/signin/page";
import { SignInContextProvider } from "../../../modules/auth/signin/context";

const SignIn = () => {
  return (
    <SignInContextProvider>
      <SignInPage />
    </SignInContextProvider>
  );
};

export default SignIn;
