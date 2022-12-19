import React from "react";
import { PersonalInfoContextProvider } from "../modules/personalinfo/context";
import { IPersonalInfo } from "../modules/personalinfo/model";
import { PersonalInformationPage } from "../modules/personalinfo/page";
interface IProps {
  personalInfo: IPersonalInfo;
}
const PersonalInfo: React.FC<IProps> = ({ personalInfo }) => {
  return (
    <div>
      <PersonalInfoContextProvider>
        <PersonalInformationPage personalInfo={personalInfo} />
      </PersonalInfoContextProvider>
    </div>
  );
};

export default PersonalInfo;
