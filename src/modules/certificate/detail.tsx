import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { Certificate } from "./components/create";
import { useCertificateState } from "./context";
import { ICertificate } from "./model";
interface IProps {
  certificate: ICertificate;
}
export const CertificateDetail: React.FC<IProps> = ({ certificate }) => {
  const { updateCVDocument } = useCertificateState();
  const router = useRouter();

  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument(values).finally(() => {
      actions.resetForm({
        values: {
          name: "",
        },
      });

      router.push("/experience");
    });
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            certificate: [
              {
                name: certificate?.name || "",
              },
            ],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Certificate
                certificate={values.certificate}
                onAdd={() =>
                  setFieldValue("certificate", [
                    ...values.certificate,
                    {
                      name: "",
                    },
                  ])
                }
                onDelete={(index: number) =>
                  setFieldValue(
                    "certificate",
                    values.certificate.filter((a, i) => i !== index)
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
