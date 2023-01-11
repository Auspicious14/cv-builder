import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ApButton, ApModal } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
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
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
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
      <div className="h-screen rounded-md shadow-sm p-3">
        <div className="flex justify-between items-center mb-2 lg:block">
          <div className="lg:py-3 font-bold uppercase lg:text-2xl lg:border-b lg:mb-4 text-lg">
            skills
          </div>
          <div className="lg:hidden">
            <GiHamburgerMenu
              size={20}
              onClick={() => setModal({ show: true })}
            />
          </div>
        </div>
        <Formik
          initialValues={{ skill: [{ skillName: skill?.skillName || "" }] }}
          onSubmit={handleSubmit}
        >
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
                className=" px-4 mt-2 py-1 uppercase lg:bg-blue-400 bg-blue-900 rounded-md border-none outline-none text-white font-bold"
              />
            </Form>
          )}
        </Formik>
      </div>
      <ApModal
        title="Cv Craft"
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
        containerClassName="w-[50%]"
        notOverflow={true}
      >
        <ApSideNav />
      </ApModal>
    </>
  );
};
