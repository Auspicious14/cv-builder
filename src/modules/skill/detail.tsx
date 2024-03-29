import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ApButton, ApGenerateButtonLoader, ApModal } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { toastSvc } from "../../services/toast";
import { Skill } from "./components/create";
import { useSkillState } from "./context";
import { ISkill } from "./model";
import { getCookie } from "../../services/helper";
interface IProps {
  skill: ISkill;
}
export const SkillDetail: React.FC<IProps> = ({ skill }) => {
  const { updateCVDocument, loading } = useSkillState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  const handleSubmit = (values: any, actions: any) => {
    const id = getCookie("user_id");
    updateCVDocument(values, id)
      .then((res) => console.log(res))
      .finally(() => {
        toastSvc.success("CV created successfully!");
        router.push("/cv");
        actions.resetForm({
          values: {
            skill: [{ skillName: "" }],
          },
        });
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
          initialValues={{ skill: [{ name: skill?.name || "" }] }}
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
                      name: "",
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
                name={loading ? <ApGenerateButtonLoader /> : "create"}
                className=" px-4 mt-2 py-1 uppercase lg:bg-blue-400 bg-blue-900 rounded-md border-none outline-none text-white font-bold"
              />
            </Form>
          )}
        </Formik>
      </div>
      <ApModal
        title={<Link href={"/"}>CV CRAFT</Link>}
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
