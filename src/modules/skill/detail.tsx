import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { useSkillState } from "./context";
import { ISkill } from "./model";
interface IProps {
  skill: ISkill;
}
export const SkillDetail: React.FC<IProps> = ({ skill }) => {
  const { createCVDocument } = useSkillState();
  const handleSubmit = (values: any) => {
    const response = createCVDocument(values);
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            secondarySchool: skill?.skill1 || "",
            university: skill?.skill2 || "",
            stateofSchool: skill?.skill3 || "",
            createdAt: skill?.skill4 || "",
            graduatedAt: skill?.skill5 || "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <ApTextInput
              label="skill 1"
              type="text"
              name="skill1"
              placeHolder=""
            />
            <ApTextInput
              label="skill 2"
              type="text"
              name="skill2"
              placeHolder=""
            />
            <ApTextInput
              label="skill 3"
              type="text"
              name="skill3"
              placeHolder=""
            />
            <ApTextInput
              label="skill 4"
              type="text"
              name="skill4"
              placeHolder=""
            />
            <ApTextInput
              label="skill 5"
              type="text"
              name="skill5"
              placeHolder=""
            />

            <ApButton type="submit" name="create" />
          </Form>
        </Formik>
      </div>
    </>
  );
};
