import { Form, Formik } from "formik";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument(values).finally(() => {
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
                location: experience?.location || "",
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
                      location: "",
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
