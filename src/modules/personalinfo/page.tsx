import { useRouter } from "next/router";
import React, { useState } from "react";
import { ApButton } from "../../components";
import { PersonalInformationDetail } from "./detail";
import { IPersonalInfo } from "./model";
interface IProps {
  personalInfo: IPersonalInfo;
}
export const PersonalInformationPage: React.FC<IProps> = ({ personalInfo }) => {
  // const [modal, setModal] = useState<{ show: boolean; data?: any }>({
  //   show: false,
  // });

  return (
    <>
      <div>
        {/* <div>
          <ApButton
            name="show"
            type="button"
            onClick={() => {
              setModal({ show: !modal.show });
            }}
          />
          <ApButton
            name="edit"
            type="button"
            onClick={() => {
              setModal({ show: true, data: personalInfo });
            }}
          />
        </div> */}

        <PersonalInformationDetail personalInfo={personalInfo} />
      </div>
    </>
  );
};
