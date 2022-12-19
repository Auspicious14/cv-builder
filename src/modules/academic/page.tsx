import React from "react";
import { ApTextInput } from "../../components";

export const AcademyPage = () => {
  return (
    <>
      <div>
        <ApTextInput
          label="Secondary School"
          type="text"
          name="secondarySchool"
          placeHolder=""
        />
        <ApTextInput
          label="University/Polytechnic/College"
          type="text"
          name="university"
          placeHolder=""
        />
        <ApTextInput
          label="State Located"
          type="text"
          name="stateofSchool"
          placeHolder="state of school attended"
        />
        <ApTextInput
          label="Date Started"
          type="text"
          name="createdAt"
          placeHolder=""
        />
        <ApTextInput
          label="Date Ended"
          type="text"
          name="graduatedAt"
          placeHolder=""
        />
      </div>
    </>
  );
};
