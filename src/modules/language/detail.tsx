import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ApButton, ApGenerateButtonLoader, ApModal } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { toastSvc } from "../../services/toast";
import { Language } from "./components/create";
import { useLanguageState } from "./context";
import { ILanguage } from "./model";
import { getCookie } from "../../services/helper";
interface IProps {
  language: ILanguage;
}
export const LanguageDetail: React.FC<IProps> = ({ language }) => {
  const { updateCVDocument, loading } = useLanguageState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  const handleSubmit = (values: any, actions: any) => {
    const id = getCookie("user_id");
    updateCVDocument(values, id)
      .then((res) => console.log(res))
      .finally(() => {
        toastSvc.success("CV created successfully!");
        router.push("/cv");
        actions.resetForm({
          values: {
            language: [{ languageName: "" }],
          },
        });
      });
  };
  return (
    <>
      <div className="h-screen rounded-md shadow-sm p-3">
        <div className="flex justify-between items-center mb-2 lg:block">
          <div className="lg:py-3 font-bold uppercase lg:text-2xl lg:border-b lg:mb-4 text-lg">
            languages
          </div>
          <div className="lg:hidden">
            <GiHamburgerMenu
              size={20}
              onClick={() => setModal({ show: true })}
            />
          </div>
        </div>
        <Formik
          initialValues={{ language: [{ name: language?.name || "" }] }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Language
                languages={values.language}
                onAdd={() => {
                  setFieldValue("language", [
                    ...values.language,
                    {
                      name: "",
                    },
                  ]);
                }}
                onDelete={(index: number) =>
                  setFieldValue(
                    "language",
                    values.language.filter((language, i) => i !== index)
                  )
                }
              />
              <ApButton
                type="submit"
                name={loading ? <ApGenerateButtonLoader /> : "create"}
                className=" px-4 mt-2 py-1 uppercase lg:bg-blue-400 bg-blue-900 rounded-md border-none outline-none text-white font-bold"
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
