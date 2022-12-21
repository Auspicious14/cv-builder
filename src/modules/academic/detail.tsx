import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { Academy } from "./components/create";
import { useAcademyState } from "./context";
import { IAcademy } from "./model";
interface IProps {
  academy: IAcademy;
}
export const AcademyDetail: React.FC<IProps> = ({ academy }) => {
  const { updateCVDocument } = useAcademyState();
  const handleSubmit = (values: any, actions: any) => {
    const response = updateCVDocument(values).finally(() => {
      actions.resetForm({
        values: {
          secondarySchool: "",
          university: "",
          createdAt: "",
          graduatedAt: "",
          stateofSchool: "",
        },
      });
    });
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            academy: [
              {
                name: academy?.name || "",
                course: academy?.course || "",
                fromDate: academy?.fromDate || "",
                toDate: academy?.toDate || "",
              },
            ],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Academy
                academy={values.academy}
                onAdd={() =>
                  setFieldValue("academy", [
                    ...values.academy,
                    {
                      name: "",
                      course: "",
                      fromDate: "",
                      toDate: "",
                    },
                  ])
                }
                onDelete={(index: number) =>
                  setFieldValue(
                    "academy",
                    values.academy.filter((a, i) => i !== index)
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
