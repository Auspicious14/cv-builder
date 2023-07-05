import React from "react";
import { ApMainLayOut } from "../modules/layout/mainlayout";
import { PersonalInfoContextProvider } from "../modules/personalinfo/context";
import { IPersonalInfo } from "../modules/personalinfo/model";
import { PersonalInformationPage } from "../modules/personalinfo/page";
import { getCookie } from "../services/helper";

const PersonalInfo = () => {
  return (
    <div>
      <PersonalInfoContextProvider>
        <ApMainLayOut>
          <PersonalInformationPage />
        </ApMainLayOut>
      </PersonalInfoContextProvider>
    </div>
  );
};

export default PersonalInfo;

export const getServerSideProps = ({
  query,
  req,
}: {
  query: any;
  req: any;
}) => {
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
