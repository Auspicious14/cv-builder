import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { AcademyPage } from "../academic/page";
import { useCvState } from "../buildcv/context";
import { PersonalInformationPage } from "../personalinfo/page";
import { SkillPage } from "../skill/page";
import { usePersonalInfoState } from "./context";
import { IPersonalInfo } from "./model";
interface IProps {
  personalInfo: IPersonalInfo;
}
export const PersonalInformationDetail: React.FC<IProps> = ({
  personalInfo,
}) => {
  const { createCVDocument } = usePersonalInfoState();
  const handleSubmit = (values: any) => {
    console.log(values);
    const response = createCVDocument(values);
    console.log(response);
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            firstName: personalInfo?.firstName || "",
            lastName: personalInfo?.lastName || "",
            phoneNumber: personalInfo?.phoneNumber || "",
            state: personalInfo?.state || "",
            city: personalInfo?.city || "",
          }}
          onSubmit={handleSubmit}
        >
          {/* {(props: FormikProps<any>) => ( */}
          <Form>
            <ApTextInput
              type="text"
              name="firstName"
              placeHolder="first name"
            />
            <ApTextInput type="text" name="lastName" placeHolder="last name" />
            <ApTextInput
              type="text"
              name="phoneNumber"
              placeHolder="phone number"
            />
            <ApTextInput type="text" name="state" placeHolder="state" />
            <ApTextInput type="text" name="city" placeHolder="city" />

            <ApButton type="submit" name="create" />
          </Form>
          {/* )} */}
        </Formik>
      </div>
    </>
  );
};
