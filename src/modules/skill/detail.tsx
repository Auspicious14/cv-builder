import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { Skill } from "./components/create";
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
          skill: [{ skillName: "" }],
        },
      });
    });
  };
  return (
    <>
      <div>
        <Formik initialValues={{ skill: [] }} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <Skill
                skills={values.skill}
                onAdd={() => {
                  setFieldValue("skill", [...values.skill, skill?.skillName]),
                    console.log(values);
                }}
                onDelete={(index: number) =>
                  setFieldValue(
                    "skill",
                    values.skill.filter((skill, i) => i !== index)
                  )
                }
              />
              <ApButton
                type="submit"
                name="create"
                className="px-4 py-2 uppercase bg-blue-400 rounded-md border-none outline-none text-white font-bold"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
