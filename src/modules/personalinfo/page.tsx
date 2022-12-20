import { useRouter } from "next/router";
import React from "react";
import { PersonalInformationDetail } from "./detail";
import { IPersonalInfo } from "./model";
interface IProps {
  personalInfo: IPersonalInfo;
}
export const PersonalInformationPage: React.FC<IProps> = ({ personalInfo }) => {
  const router = useRouter();
  return (
    <>
      <div>
        <PersonalInformationDetail personalInfo={personalInfo} />
      </div>
    </>
  );
};
