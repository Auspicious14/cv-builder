import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { Experience } from "./components/creat";
import { useExperienceState } from "./context";
import { IExperience } from "./model";
interface IProps {
  experience: IExperience;
}
export const ExperienceDetail: React.FC<IProps> = ({ experience }) => {
  const { updateCVDocument } = useExperienceState();
  const handleSubmit = (values: any, actions: any) => {
    const response = updateCVDocument(values).finally(() => {
      actions.resetForm({
        values: {
          experience: [
            {
              jobTitle: "",
              description: "",
              organization: "",
              fromDate: "",
              toDate: "",
            },
          ],
        },
      });
    });
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            experience: [
              {
                jobTitle: experience?.jobTitle || "",
                organization: experience?.organization || "",
                description: experience?.description || "",
                fromDate: experience?.fromDate || "",
                toDate: experience?.toDate || "",
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
                      fromDate: "",
                      toDate: "",
                    },
                  ])
                }
                onDelete={(index: number) =>
                  setFieldValue(
                    "experience",
                    values.experience.filter((e, i) => i !== index)
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
