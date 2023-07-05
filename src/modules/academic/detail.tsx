import { Form, Formik } from "formik";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ApButton, ApGenerateButtonLoader, ApModal } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { Academy } from "./components/create";
import { useAcademyState } from "./context";
import { IAcademy } from "./model";
import { getCookie } from "../../services/helper";
interface IProps {
  academic: IAcademy;
}
export const AcademyDetail: React.FC<IProps> = ({ academic }) => {
  const { updateCVDocument, loading } = useAcademyState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  const handleSubmit = (values: any, actions: any) => {
    console.log(values);
    const id = getCookie("user_id");
    updateCVDocument(values, id)
      .then((res) => router.push("/certificate"))
      .finally(() => {
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
      <div className="p-3">
        <div className="flex justify-between items-center mb-2 lg:block">
          <p className="lg:py-3 font-bold uppercase lg:text-2xl lg:border-b text-lg">
            EDUCATION
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
            academic: [
              {
                school: academic?.school || "",
                degree: academic?.degree || "",
                course: academic?.course || "",
                fromDate: academic?.fromDate || "",
                toDate: academic?.toDate || "",
              },
            ],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Academy
                academy={values.academic}
                onAdd={() =>
                  setFieldValue("academic", [
                    ...values.academic,
                    {
                      school: "",
                      course: "",
                      degree: "",
                      fromDate: moment().startOf("month").toDate(),
                      toDate: moment().endOf("month").toDate(),
                    },
                  ])
                }
                onDelete={(index: number) =>
                  setFieldValue(
                    "academic",
                    values.academic.filter((a, i) => i !== index)
                  )
                }
                handleDate={(date: any, i: number) => {
                  console.log(date, "handle datee"),
                    setFieldValue(
                      "academic",
                      values.academic.map((e, index) => {
                        if (i !== index) return e;
                        return {
                          ...e,
                          fromDate: date.startDate,
                          toDate: date.endDate,
                        };
                      })
                    );
                }}
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
