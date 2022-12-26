import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { usePersonalInfoState } from "./context";
import { IPersonalInfo } from "./model";
interface IProps {
  personalInfo: IPersonalInfo;
}
export const PersonalInformationDetail: React.FC<IProps> = ({
  personalInfo,
}) => {
  const { createCVDocument } = usePersonalInfoState();
  const router = useRouter();

  const handleSubmit = async (values: any, actions: any) => {
    await createCVDocument(values).finally(() => {
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
      router.push("/academy");
    });
  };

  return (
    <>
      <div className="p-3">
        <div className="py-3 font-bold uppercase text-2xl border-b mb-4">
          personal Information
        </div>
        <Formik
          initialValues={{
            firstName: personalInfo?.firstName || "",
            lastName: personalInfo?.lastName || "",
            description: personalInfo?.description || "",
            address: personalInfo?.address || "",
            profession: personalInfo?.profession || "",
            phoneNumber: personalInfo?.phoneNumber || "",
            state: personalInfo?.state || "",
            city: personalInfo?.city || "",
            country: personalInfo?.country || "",
            file: personalInfo?.file || "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <ApTextInput
              label="First Name"
              type="text"
              name="firstName"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="Last Name"
              type="text"
              name="lastName"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="Email"
              type="email"
              name="email"
              className="p-3 outline-blue-400"
            />

            <ApTextInput
              label="Phone Number"
              type="text"
              name="phoneNumber"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="Description"
              type="textarea"
              name="description"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="Profession"
              type="text"
              name="profession"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="Address"
              type="text"
              name="address"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="State"
              type="text"
              name="state"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="City"
              type="text"
              name="city"
              className="p-3 outline-blue-400"
            />
            <ApTextInput
              label="Country"
              type="text"
              name="country"
              className="p-3 outline-blue-400"
            />

            <ApButton
              type="submit"
              name="create"
              className="px-4 py-2 uppercase bg-blue-400 rounded-md border-none outline-none text-white font-bold"
            />
          </Form>
        </Formik>
      </div>
    </>
  );
};
