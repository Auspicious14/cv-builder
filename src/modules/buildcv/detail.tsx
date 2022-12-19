import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { AcademyPage } from "../academic/page";
import { PersonalInformationPage } from "../personalinfo/page";
import { SkillPage } from "../skill/page";
import { useCvState } from "./context";
import { ICV } from "./model";
interface IProps {
  cv: ICV;
}
export const BuildCVDetail: React.FC<IProps> = ({ cv }) => {
  const { createCVDocument } = useCvState();
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
            firstName: cv?.personalInfo?.firstName || "",
            lastName: cv?.personalInfo?.lastName || "",
            phoneNumber: cv?.personalInfo?.phoneNumber || "",
            state: cv?.personalInfo?.state || "",
            city: cv?.personalInfo?.city || "",
            skill1: cv?.skill?.skill1 || "",
            skill2: cv?.skill?.skill2 || "",
            skill3: cv?.skill?.skill3 || "",
            skill4: cv?.skill?.skill4 || "",
            skill5: cv?.skill?.skill5 || "",
            secondarySchool: cv?.academy?.secondarySchool || "",
            university: cv?.academy?.university || "",
            stateofSchool: cv?.academy?.stateofSchool || "",
            createdAt: cv?.academy?.createdAt || "",
            graduatedAt: cv?.academy?.graduatedAt || "",
          }}
          onSubmit={handleSubmit}
        >
          {/* {(props: FormikProps<any>) => ( */}
          <Form>
            <PersonalInformationPage />
            <AcademyPage />
            <SkillPage />
            <ApButton type="submit" name="Create CV" />
          </Form>
          {/* )} */}
        </Formik>
      </div>
    </>
  );
};
