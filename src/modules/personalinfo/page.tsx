import React, { useState } from "react";
import { PersonalInformationDetail } from "./detail";
import { IPersonalInfo } from "./model";

export const PersonalInformationPage = () => {
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>() as any;

  return (
    <>
      <div>
        <div className="">
          <PersonalInformationDetail personalInfo={personalInfo} />
        </div>
      </div>
    </>
  );
};
