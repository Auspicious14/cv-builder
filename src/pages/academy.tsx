import React from "react";
import { AcademyContextProvider } from "../modules/academic/context";
import { AcademyPage } from "../modules/academic/page";
import { ApMainLayOut } from "../modules/layout/mainlayout";

const Academy = () => {
  return (
    <div>
      <AcademyContextProvider>
        <ApMainLayOut>
          <AcademyPage />
        </ApMainLayOut>
      </AcademyContextProvider>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  if (!req?.cookies.user_id) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  // console.log(id);
  return {
    props: {},
  };
};
export default Academy;
