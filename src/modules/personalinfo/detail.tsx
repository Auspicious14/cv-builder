import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { usePersonalInfoState } from "./context";
import { IPersonalInfo } from "./model";
interface IProps {
  personalInfo: IPersonalInfo;
  onShow?: () => void;
}
export const PersonalInformationDetail: React.FC<IProps> = ({
  personalInfo,
  onShow,
}) => {
  const { createCVDocument } = usePersonalInfoState();

  const handleSubmit = async (values: any, actions: any) => {
    console.log(values);
    const response = await createCVDocument(values).finally(() => {
      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          description: "",
          state: "",
          city: "",
          country: "",
        },
      });
    });
    console.log(response);
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            firstName: personalInfo?.firstName || "",
            lastName: personalInfo?.lastName || "",
            description: personalInfo?.description || "",
            address: personalInfo?.address || "",
            phoneNumber: personalInfo?.phoneNumber || "",
            state: personalInfo?.state || "",
            city: personalInfo?.city || "",
            country: personalInfo?.country || "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <ApTextInput
              type="text"
              name="firstName"
              placeHolder="first name"
            />
            <ApTextInput type="text" name="lastName" placeHolder="last name" />
            <ApTextInput type="email" name="email" placeHolder="email" />

            <ApTextInput
              type="text"
              name="phoneNumber"
              placeHolder="phone number"
            />
            <ApTextInput
              type="textarea"
              name="description"
              placeHolder="Description"
            />
            <ApTextInput type="text" name="address" placeHolder="address" />
            <ApTextInput type="text" name="state" placeHolder="state" />
            <ApTextInput type="text" name="city" placeHolder="city" />
            <ApTextInput type="text" name="country" placeHolder="country" />

            <ApButton type="submit" name="create" />
          </Form>
        </Formik>
      </div>
    </>
  );
};
