import React from "react";
import { ApMainLayOut } from "../modules/layout/mainlayout";
import { PersonalInfoContextProvider } from "../modules/personalinfo/context";
import { IPersonalInfo } from "../modules/personalinfo/model";
import { PersonalInformationPage } from "../modules/personalinfo/page";

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
