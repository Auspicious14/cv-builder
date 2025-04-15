import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ApButton, ApGenerateButtonLoader, ApModal } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { Certificate } from "./components/create";
import { useCertificateState } from "./context";
import { ICertificate } from "./model";
import { getCookie } from "../../services/helper";
interface IProps {
  certificate: ICertificate;
}
export const CertificateDetail: React.FC<IProps> = ({ certificate }) => {
  const { updateCVDocument, loading } = useCertificateState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  const handleSubmit = (values: any, actions: any) => {
    const id = getCookie("user_id");

    updateCVDocument(values, id)
      .then((res) => {
        router.push("/experience");
      })
      .finally(() => {
        actions.resetForm({
          values: {
            name: "",
            year: "",
          },
        });
      });
  };
  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center mb-2 lg:block">
          <p className="lg:py-3 font-bold uppercase lg:border-b lg:text-2xl text-lg">
            CERTIFICATION
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
            certificate: [
              {
                name: certificate?.name || "",
                year: certificate?.year || "",
                school: certificate?.school || "",
                description: certificate?.description || "",
              },
            ],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Certificate
                certificate={values.certificate}
                onAdd={() =>
                  setFieldValue("certificate", [
                    ...values.certificate,
                    {
                      name: "",
                      year: "",
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
                name={"create"}
                isLoading={loading}
                leftIcon={loading ? <ApGenerateButtonLoader /> : null}
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
