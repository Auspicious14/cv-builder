import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { useAcademyState } from "./context";
import { IAcademy } from "./model";
interface IProps {
  academy: IAcademy;
}
export const AcademyDetail: React.FC<IProps> = ({ academy }) => {
  const { createCVDocument } = useAcademyState();
  const handleSubmit = (values: any) => {
    console.log(values);
    const response = createCVDocument(values);
    console.log(response);
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            secondarySchool: academy?.secondarySchool || "",
            university: academy?.university || "",
            stateofSchool: academy?.stateofSchool || "",
            createdAt: academy?.createdAt || "",
            graduatedAt: academy?.graduatedAt || "",
          }}
          onSubmit={handleSubmit}
        >
          {/* {(props: FormikProps<any>) => ( */}
          <Form>
            <ApTextInput
              label="Secondary School"
              type="text"
              name="secondarySchool"
              placeHolder=""
            />
            <ApTextInput
              label="University/Polytechnic/College"
              type="text"
              name="university"
              placeHolder=""
            />
            <ApTextInput
              label="State Located"
              type="text"
              name="stateofSchool"
              placeHolder="state of school attended"
            />
            <ApTextInput
              label="Date Started"
              type="text"
              name="createdAt"
              placeHolder=""
            />
            <ApTextInput
              label="Date Ended"
              type="text"
              name="graduatedAt"
              placeHolder=""
            />

            <ApButton type="submit" name="create" />
          </Form>
          {/* )} */}
        </Formik>
      </div>
    </>
  );
};
