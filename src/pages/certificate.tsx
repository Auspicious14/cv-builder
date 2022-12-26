import React from "react";
import { CertificateContextProvider } from "../modules/certificate/context";
import { CertificatePage } from "../modules/certificate/page";
import { ApMainLayOut } from "../modules/layout/mainlayout";

const Certificate = () => {
  return (
    <>
      <CertificateContextProvider>
        <ApMainLayOut>
          <CertificatePage />
        </ApMainLayOut>
      </CertificateContextProvider>
    </>
  );
};

export default Certificate;
