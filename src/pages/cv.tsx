import React from "react";
import { CVContetxProvider } from "../modules/buildcv/context";
import { BuildPage } from "../modules/buildcv/page";
import { getCookie } from "../services/helper";

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

export const getServerSideProps = ({ req }: any) => {
  const userId = req?.cookies?.user_id;
  console.log(userId);
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
