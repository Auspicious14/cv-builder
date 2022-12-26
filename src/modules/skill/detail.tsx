import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ApButton } from "../../components";
import { toastSvc } from "../../services/toast";
import { Skill } from "./components/create";
import { useSkillState } from "./context";
import { ISkill } from "./model";
interface IProps {
  skill: ISkill;
}
export const SkillDetail: React.FC<IProps> = ({ skill }) => {
  const { updateCVDocument } = useSkillState();
  const router = useRouter();

  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument(values).finally(() => {
      toastSvc.success("CV created successfully!");
      actions.resetForm({
        values: {
          skill: [{ skillName: "" }],
        },
      });
      router.push("/cv");
    });
  };
  return (
    <>
      <div className="h-screen bg-gray-100 rounded-md shadow-sm p-3">
        <p className="font-bold text-2xl">SKILLS</p>
        <Formik initialValues={{ skill: [] }} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <Skill
                skills={values.skill}
                onAdd={() => {
                  setFieldValue("skill", [
                    ...values.skill,
                    {
                      skillName: "",
                    },
                  ]);
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
                className="fixed bottom-1 px-4 mt-2 py-1 uppercase bg-blue-400 rounded-md border-none outline-none text-white font-bold"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
