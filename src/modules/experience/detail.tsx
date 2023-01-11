import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ApButton, ApModal, ApTextInput } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { IExperience } from "./model";
import { Experience } from "./components/creat";
import { useExperienceState } from "./context";
import * as Yup from "yup";
import moment from "moment";

const FormSchema = Yup.object().shape({});
interface IProps {
  experience: IExperience;
}
export const ExperienceDetail: React.FC<IProps> = ({ experience }) => {
  const { updateCVDocument } = useExperienceState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
  });

  // const handleDate = (date: any) => {
  //   setDate(date);
  // };

  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument({
      ...values,
      // fromDate: date.startDate.getTime(),
      // toDate: date.endDate.getTime(),
    }).finally(() => {
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
      router.push("/skill");
    });

    console.log(values);
  };
  console.log(moment.now());
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
                description: experience?.description || "",
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
              />
              <ApButton
                type="submit"
                name="create"
                className="px-4 py-2 uppercase lg:bg-blue-400 bg-blue-900 rounded-md border-none outline-none text-white font-bold"
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
