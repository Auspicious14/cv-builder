import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  ApButton,
  ApGenerateButtonLoader,
  ApModal,
  ApTextInput,
  Files,
} from "../../components";
import { ApSideNav } from "../../components/nav/sidenav";
import { usePersonalInfoState } from "./context";
import { IPersonalInfo } from "./model";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { UploadProps } from "antd";
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
  const [file, setFile] = useState(null) as any;
  // const getDescriptiveAiInfo = async (prompt: string) => {
  //   setLoading(true);
  //   const response = await fetch("/api/open-ai", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ text: prompt }),
  //   });

  //   try {
  //     setLoading(false);
  //     const data = await response.json();
  //     setDescription(data.result);
  //     console.log(data.result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  console.log(file, "fileeee");
  const handleProductImage: UploadProps["onChange"] = (file) => {
    console.log(file.file, "newFIle");
    setFile(file.file);
  };

  useEffect(() => {
    if (personalInfo?.image) {
      setFile({
        uri: personalInfo?.image.uri,
        name: personalInfo?.image.name,
        type: personalInfo?.image.type,
        uid: personalInfo?.image._id,
        preview: personalInfo?.image.uri,
      });
    }
    console.log(personalInfo?.image, "personal imageee");
  }, [personalInfo]);

  const handleSubmit = async (values: any, actions: any) => {
    console.log(file);
    await createCVDocument({
      personalInformation: {
        ...values,
        image: {
          uri: file?.thumbUrl,
          name: file?.name,
          type: file?.type,
        },
      },
    })
      .then((res) => {
        // router.push("/academy");
      })
      .finally(() => {
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
  // console.log(getUser);
  // useEffect(() => {
  //   getUserFunc();
  // }, []);

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
          // validationSchema={{}}
          initialValues={{
            firstName: personalInfo?.firstName || "",
            lastName: personalInfo?.lastName || "",
            email: personalInfo?.email || "",
            description: personalInfo?.description || "",
            address: personalInfo?.address || "",
            profession: personalInfo?.profession || "",
            phoneNumber: personalInfo?.phoneNumber || "",
            state: personalInfo?.state || "",
            city: personalInfo?.city || "",
            country: personalInfo?.country || "",
            // image: personalInfo?.image || files,
            // image: personalInfo?.image || "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Files
              // fileList={{ file }}
              handleChange={(res: any) => handleProductImage(res)}
            />
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
              name={"description"}
              className="p-3 outline-blue-400"
            />

            <ApTextInput
              label="Profession"
              type="text"
              name="profession"
              className="p-3 outline-blue-400"
            />
            {/* <ApButton
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
            /> */}

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
