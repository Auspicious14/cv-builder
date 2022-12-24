import React from "react";
import { CertificateContextProvider } from "../modules/certificate/context";
import { CertificatePage } from "../modules/certificate/page";

const Certificate = () => {
  return (
    <>
      <CertificateContextProvider>
        <CertificatePage />
      </CertificateContextProvider>
    </>
  );
};

export default Certificate;
