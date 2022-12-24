import React, { useState } from "react";
import { CertificateDetail } from "./detail";
import { ICertificate } from "./model";

export const CertificatePage = () => {
  const [certificate, setCertificate] = useState<ICertificate>();
  return (
    <>
      <CertificateDetail certificate={certificate as any} />
    </>
  );
};
