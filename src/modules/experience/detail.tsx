import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ApButton, ApGenerateButtonLoader, ApModal } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { IExperience } from "./model";
import { Experience } from "./components/creat";
import { useExperienceState } from "./context";
import * as Yup from "yup";
import moment from "moment";
import Link from "next/link";

const FormSchema = Yup.object().shape({});
interface IProps {
  experience: IExperience;
}
export const ExperienceDetail: React.FC<IProps> = ({ experience }) => {
  const { updateCVDocument, loading, result, setResult, load } =
    useExperienceState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
  const [category, setCategory] = useState<string>("");
  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument({
      ...values,
      // description: result,
    }).finally(() => {
      router.push("/skill");
      actions.resetForm({
        values: {
          experience: [
            {
              jobTitle: "",
              description: "",
              organization: "",
              fromDate: "",
              toDate: "",
              location: "",
            },
          ],
        },
      });
    });
  };

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center mb-2 lg:block">
          <p className="lg:py-3 font-bold lg:text-2xl uppercase lg:border-b text-lg">
            EXPERIENCE
          </p>
          <div className="lg:hidden">
            <GiHamburgerMenu
              size={20}
              onClick={() => setModal({ show: true })}
            />
          </div>
        </div>
        <Formik
          initialValues={{
            experience: [
              {
                jobTitle: experience?.jobTitle || "",
                organization: experience?.organization || "",
                description: result || "",
                location: experience?.location || "",
                fromDate:
                  experience?.fromDate || moment().startOf("month").toDate(),
                toDate: experience?.toDate || moment().endOf("month").toDate(),
              },
            ],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Experience
                experience={values.experience}
                onAdd={() =>
                  setFieldValue("experience", [
                    ...values.experience,
                    {
                      jobTitle: "",
                      organization: "",
                      description: "",
                      location: "",
                      fromDate: moment().startOf("month").toDate(),
                      toDate: moment().endOf("month").toDate(),
                    },
                  ])
                }
                onDelete={(index: number) =>
                  setFieldValue(
                    "experience",
                    values.experience.filter((e, i) => i !== index)
                  )
                }
                handleDate={(date: any, i: number) =>
                  setFieldValue(
                    "experience",
                    values.experience.map((e, index) => {
                      if (i !== index) return e;
                      return {
                        ...e,
                        fromDate: date.fromDate,
                        endDate: date.endDate,
                      };
                    })
                  )
                }
                value={result}
                category={category}
                onChange={(e) => setCategory(e.target.value)}
                loading={load}
                onTextChange={() => {}}
              />
              <ApButton
                type="submit"
                name={loading ? <ApGenerateButtonLoader /> : "create"}
                className="px-4 py-2 uppercase lg:bg-blue-400 bg-blue-900 rounded-md border-none outline-none text-white font-bold"
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
