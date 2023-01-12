import { Form, Formik } from "formik";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ApButton, ApModal, ApTextInput } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { Academy } from "./components/create";
import { useAcademyState } from "./context";
import { IAcademy } from "./model";
interface IProps {
  academy: IAcademy;
}
export const AcademyDetail: React.FC<IProps> = ({ academy }) => {
  const { updateCVDocument } = useAcademyState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
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
            academy: [
              {
                name: academy?.name || "",
                course: academy?.course || "",
                fromDate:
                  academy?.fromDate || moment().startOf("month").toDate(),
                toDate: academy?.toDate || moment().endOf("month").toDate(),
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
                      fromDate: moment().startOf("month").toDate(),
                      toDate: moment().endOf("month").toDate(),
                    },
                  ])
                }
                onDelete={(index: number) =>
                  setFieldValue(
                    "academy",
                    values.academy.filter((a, i) => i !== index)
                  )
                }
                handleDate={(date: any, i: number) =>
                  setFieldValue(
                    "experience",
                    values.academy.map((e, index) => {
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
