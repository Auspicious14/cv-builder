import { Form, Formik } from "formik";
import React, { useState } from "react";
import { ApButton, ApTextInput } from "../../../components";
import { Academy } from "../../academic/components/create";
import { Experience } from "../../experience/components/creat";
import { Skill } from "../../skill/components/create";
import { useCvState } from "../context";
import { ICV } from "../model";

interface IProps {
  update: ICV;
  onDissmiss: () => void;
}
export const UpdateCVModal: React.FC<IProps> = ({ update, onDissmiss }) => {
  const { updateCVDocument, uploadImageDocument } = useCvState();
  const [imageUpload, setImageUpload] = useState<any>();
  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument(values).then((res) => {
      if (res && onDissmiss) {
        onDissmiss();
      }
      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          description: "",
          address: "",
          state: "",
          country: "",
          city: "",
          skill: [],
          academy: [],
          experience: [],
        },
      });
    });
  };

  const handleChange = (e: any) => {
    if (e.target.files[0] === null) return;
    setImageUpload(e.target.files[0]);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: update?.firstName || "",
          lastName: update?.lastName || "",
          email: update?.email || "",
          phoneNumber: update?.phoneNumber || "",
          description: update?.description || "",
          address: update?.address || "",
          state: update?.state || "",
          country: update?.country || "",
          city: update?.city || "",
          skill: update?.skill || [],
          academy: update?.academy || [],
          experience: update?.experience || [],
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <input
              type="file"
              id=""
              accept="image/*"
              onChange={(event) => handleChange(event)}
            />
            <ApButton
              name="create image"
              type="button"
              onClick={() => uploadImageDocument(imageUpload)}
              className="px-4 py-2 uppercase bg-blue-400 rounded-md border-none outline-none text-white font-bold"
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
              name="description"
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
            <Academy
              academy={values.academy}
              onAdd={() =>
                setFieldValue("academy", [
                  ...values.academy,
                  {
                    name: "",
                    course: "",
                    fromDate: "",
                    toDate: "",
                  },
                ])
              }
              onDelete={(index: number) =>
                setFieldValue(
                  "academy",
                  values.academy.filter((a, i) => i !== index)
                )
              }
            />
            <Experience
              experience={values.experience}
              onAdd={() =>
                setFieldValue("experience", [
                  ...values.experience,
                  {
                    jobTitle: "",
                    organization: "",
                    description: "",
                    fromDate: "",
                    toDate: "",
                    location: "",
                  },
                ])
              }
              onDelete={(index: number) =>
                setFieldValue(
                  "experience",
                  values.experience.filter((e, i) => i !== index)
                )
              }
            />
            <Skill
              skills={values.skill}
              onAdd={() => {
                setFieldValue("skill", [
                  ...values.skill,
                  update?.skill[0].skillName,
                ]),
                  console.log(values);
              }}
              onDelete={(index: number) =>
                setFieldValue(
                  "skill",
                  values.skill.filter((skill, i) => i !== index)
                )
              }
            />
            <ApButton
              type="submit"
              name="update"
              className="px-4 py-2 uppercase bg-blue-400 rounded-md border-none outline-none text-white font-bold"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
