import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { useSkillState } from "./context";
import { ISkill } from "./model";
interface IProps {
  skill: ISkill;
}
export const SkillDetail: React.FC<IProps> = ({ skill }) => {
  const { updateCVDocument } = useSkillState();
  const handleSubmit = (values: any, actions: any) => {
    const response = updateCVDocument(values).finally(() => {
      actions.resetForm({
        values: {
          skill1: "",
          skill2: "",
          skill3: "",
          skill4: "",
          skill5: "",
        },
      });
    });
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            skill1: skill?.skill1 || "",
            skill2: skill?.skill2 || "",
            skill3: skill?.skill3 || "",
            skill4: skill?.skill4 || "",
            skill5: skill?.skill5 || "",
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
