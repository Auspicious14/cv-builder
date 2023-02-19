import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  ApButton,
  ApGenerateButtonLoader,
  ApModal,
  ApTextInput,
} from "../../components";
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
  const {
    createCVDocument,
    getUser,
    getUserFunc,
    loading: createLoading,
  } = usePersonalInfoState();
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  const getDescriptiveAiInfo = async (prompt: string) => {
    setLoading(true);
    const response = await fetch("/api/open-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: prompt }),
    });

    try {
      setLoading(false);
      const data = await response.json();
      setDescription(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values: any, actions: any) => {
    const { displayName, lastName, email, profession } = getUser;
    await createCVDocument({
      ...values,
      description,
      firstName: displayName,
      lastName: values.lastName || lastName,
      profession: values.profession || profession,
      email,
    }).finally(() => {
      router.push("/academy");
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
  };
  console.log(getUser);
  useEffect(() => {
    getUserFunc();
  }, []);

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
            {getUser?.displayName ? (
              <div>
                <label htmlFor="">First Name</label>
                <input
                  type={"text"}
                  value={getUser?.displayName}
                  className={`w-full mb-2 rounded-md border p-3 outline-blue-400`}
                  // onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            ) : (
              <ApTextInput
                label="First Name"
                type="text"
                name="firstName"
                className="p-3 outline-blue-400"
              />
            )}

            {getUser.lastName ? (
              <div>
                <label htmlFor="">Last Name</label>
                <input
                  type={"text"}
                  value={getUser?.lastName}
                  className={`w-full mb-2 rounded-md border p-3 outline-blue-400`}
                  // onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            ) : (
              <ApTextInput
                label="Last Name"
                type="text"
                name="lastName"
                className="p-3 outline-blue-400"
              />
            )}

            {getUser?.email ? (
              <div>
                <label htmlFor="">Email</label>
                <input
                  value={getUser?.email}
                  type={"email"}
                  className={`w-full mb-2 rounded-md border p-3 outline-blue-400`}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            ) : (
              <ApTextInput
                label="Email"
                type="email"
                name="email"
                className="p-3 outline-blue-400"
              />
            )}

            <ApTextInput
              label="Phone Number"
              type="text"
              name="phoneNumber"
              className="p-3 outline-blue-400"
            />
            {description ? (
              <div className="flex flex-col">
                <label htmlFor="">Description</label>
                <textarea
                  name={"description"}
                  value={description}
                  rows={5}
                  cols={30}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 border rounded-md outline-blue-400 w-full"
                />
              </div>
            ) : (
              <ApTextInput
                label="Description"
                type="textarea"
                name={"description"}
                className="p-3 outline-blue-400"
              />
            )}
            <ApButton
              type="button"
              name={
                loading ? <ApGenerateButtonLoader /> : "Generate Description"
              }
              className="bg-blue-900 px-2 my-2 py-1 border outline-none rounded-md text-white"
              onClick={() =>
                getDescriptiveAiInfo(
                  `Describe me (${getUser?.displayName}) as a ${getUser?.profession}`
                )
              }
            />
            {getUser.profession ? (
              <div>
                <label htmlFor="">Profession</label>
                <input
                  type={"text"}
                  value={getUser?.profession}
                  className={`w-full mb-2 rounded-md border p-3 outline-blue-400`}
                  // onChange={(e) => setProfession(e.target.value)}
                />
              </div>
            ) : (
              <ApTextInput
                label="Profession"
                type="text"
                name="profession"
                className="p-3 outline-blue-400"
              />
            )}
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
              name={createLoading ? <ApGenerateButtonLoader /> : "create"}
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
