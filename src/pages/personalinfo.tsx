import React from "react";
import { PersonalInfoContextProvider } from "../modules/personalinfo/context";
import { IPersonalInfo } from "../modules/personalinfo/model";
import { PersonalInformationPage } from "../modules/personalinfo/page";

const PersonalInfo = () => {
  return (
    <div>
      <PersonalInfoContextProvider>
        <PersonalInformationPage />
      </PersonalInfoContextProvider>
    </div>
  );
};

export default PersonalInfo;
