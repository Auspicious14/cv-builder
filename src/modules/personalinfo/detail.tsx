import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ApButton, ApModal, ApTextInput } from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { usePersonalInfoState } from "./context";
import { IPersonalInfo } from "./model";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
interface IProps {
  personalInfo: IPersonalInfo;
}
export const PersonalInformationDetail: React.FC<IProps> = ({
  personalInfo,
}) => {
  const { createCVDocument } = usePersonalInfoState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
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
        <div className="flex justify-between items-center mb-2 lg:block">
          <div className="lg:py-3 font-bold uppercase lg:text-2xl lg:border-b lg:mb-4 text-lg">
            personal Information
          </div>
          <div className="lg:hidden">
            <GiHamburgerMenu
              size={20}
              onClick={() => setModal({ show: true })}
            />
          </div>
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
              className="px-4 py-2 uppercase lg:bg-blue-400 bg-blue-900 rounded-md border-none outline-none text-white font-bold"
            />
          </Form>
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
