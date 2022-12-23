import React from "react";
import { CVContetxProvider } from "../modules/buildcv/context";
import { BuildPage } from "../modules/buildcv/page";

const CV = () => {
  return (
    <>
      <CVContetxProvider>
        <BuildPage />
      </CVContetxProvider>
    </>
  );
};

export default CV;
