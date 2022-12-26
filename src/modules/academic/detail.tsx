import { Form, Formik } from "formik";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument(values).finally(() => {
      actions.resetForm({
        values: {
          secondarySchool: "",
          university: "",
          createdAt: "",
          graduatedAt: "",
          stateofSchool: "",
        },
      });
      router.push("/certificate");
    });
  };

  return (
    <>
      <div className="p-3">
        <p className="py-3 font-bold uppercase text-2xl border-b">EDUCATION</p>
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
