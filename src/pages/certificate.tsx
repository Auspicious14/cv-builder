import React from "react";
import { CertificateContextProvider } from "../modules/certificate/context";
import { CertificatePage } from "../modules/certificate/page";
import { ApMainLayOut } from "../modules/layout/mainlayout";
import { getCookie } from "../services/helper";

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

export const getServerSideProps = ({ req }: any) => {
  const userId = req?.cookies?.user_id;
  if (!userId)
    return {
      redirect: {
        destination: "/auth/signin",
        permenant: false,
      },
    };

  return {
    props: {},
  };
};
