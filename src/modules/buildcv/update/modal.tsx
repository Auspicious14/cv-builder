import { Form, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { ApButton, ApTextInput } from "../../../components";
import { toastSvc } from "../../../services/toast";
import { Academy } from "../../academic/components/create";
import { Certificate } from "../../certificate/components/create";
import { Experience } from "../../experience/components/creat";
import { Skill } from "../../skill/components/create";
import { useCvState } from "../context";
import { ICV } from "../model";

interface IProps {
  update: ICV;
  onDissmiss: () => void;
}
export const UpdateCVModal: React.FC<IProps> = ({ update, onDissmiss }) => {
  const [cvState, setCvState] = useState(update);
  const { updateCVDocument, uploadImageDocument } = useCvState();
  const [imageUpload, setImageUpload] = useState<any>();
  const [modal, setModal] = useState<{
    show: boolean;
    type?: "academy" | "experience" | "skill" | "certificate" | "personalInfo";
  }>({
    show: false,
  });

  const handleSubmit = (values: any, actions: any) => {
    updateCVDocument(values).then((res) => {
      // setCvState(r)
      if (res && onDissmiss) {
        onDissmiss();
        toastSvc.success("Resume updated!");
      }
      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          description: "",
          profession: "",
          address: "",
          state: "",
          country: "",
          city: "",
          skill: [],
          academy: [],
          experience: [],
          certificate: [],
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
          personalInformation: {
            firstName: update?.personalInformation?.firstName || "",
            lastName: update?.personalInformation?.lastName || "",
            email: update?.personalInformation?.email || "",
            phoneNumber: update?.personalInformation?.phoneNumber || "",
            description: update?.personalInformation?.description || "",
            address: update?.personalInformation?.address || "",
            state: update?.personalInformation?.state || "",
            country: update?.personalInformation?.country || "",
            city: update?.personalInformation?.city || "",
            profession: update?.personalInformation?.profession || "",
          },
          skill: update?.skill || [],
          academic: update?.academic || [],
          experience: update?.experience || [],
          certificate: update?.certificate || [],
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {modal.show && modal.type == "personalInfo" ? (
              <div>
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
                  name="personalInformation.firstName"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="Last Name"
                  type="text"
                  name="personalInformation.lastName"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="Email"
                  type="email"
                  name="personalInformation.email"
                  className="p-3 outline-blue-400"
                />

                <ApTextInput
                  label="Phone Number"
                  type="text"
                  name="personalInformation.phoneNumber"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="Description"
                  type="textarea"
                  name="personalInformation.description"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="Profession"
                  type="text"
                  name="personalInformation.profession"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="Address"
                  type="text"
                  name="personalInformation.address"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="State"
                  type="text"
                  name="personalInformation.state"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="City"
                  type="text"
                  name="personalInformation.city"
                  className="p-3 outline-blue-400"
                />
                <ApTextInput
                  label="Country"
                  type="text"
                  name="personalInformation.country"
                  className="p-3 outline-blue-400"
                />
              </div>
            ) : null}

            <ApButton
              type="button"
              name={
                modal.show && modal.type == "personalInfo"
                  ? "close personal info form"
                  : "open personal info form"
              }
              onClick={() =>
                setModal({ show: !modal.show, type: "personalInfo" })
              }
              className={`${
                modal.show && modal.type == "personalInfo"
                  ? "bg-green-400 px-4 py-2 border rounded-md text-white"
                  : "bg-red-400 px-4 py-2 border rounded-md text-white"
              }`}
            />

            {modal.show && modal.type == "academy" ? (
              <Academy
                academy={values.academic}
                onAdd={() =>
                  setFieldValue("academic", [
                    ...values.academic,
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
                    "academic",
                    values.academic.filter((a, i) => i !== index)
                  )
                }
                handleDate={(date: any, i: number) =>
                  setFieldValue(
                    "academic",
                    values.academic.map((e, index) => {
                      if (i !== index) return e;
                      return {
                        ...e,
                        fromDate: date.fromDate,
                        toDate: date.endDate,
                      };
                    })
                  )
                }
              />
            ) : null}

            <ApButton
              type="button"
              name={
                modal.show && modal.type == "academy"
                  ? "close academy form"
                  : "open academy form"
              }
              onClick={() => setModal({ show: !modal.show, type: "academy" })}
              className={`${
                modal.show && modal.type == "academy"
                  ? "bg-green-400 px-4 py-2 border rounded-md text-white"
                  : "bg-red-400 px-4 py-2 border rounded-md text-white"
              }`}
            />

            {modal.show && modal.type === "experience" ? (
              <Experience
                experience={values.experience}
                onAdd={() =>
                  setFieldValue("experience", [
                    ...values.experience,
                    {
                      jobTitle: "",
                      organization: "",
                      description: "",
                      fromDate: moment().startOf("month").toDate(),
                      toDate: moment().endOf("month").toDate(),
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
                handleDate={(date: any, i: number) =>
                  setFieldValue(
                    "experience",
                    values.experience.map((e, index) => {
                      if (i !== index) return e;
                      return {
                        ...e,
                        fromDate: date.fromDate,
                        toDate: date.endDate,
                      };
                    })
                  )
                }
                value={""}
                category={""}
                loading={false}
                onChange={() => {}}
                onTextChange={() => {}}
              />
            ) : null}

            <ApButton
              type="button"
              name={
                modal.show && modal.type == "experience"
                  ? "close experience form"
                  : "open experience form"
              }
              onClick={() =>
                setModal({ show: !modal.show, type: "experience" })
              }
              className={`${
                modal.show && modal.type == "experience"
                  ? "bg-green-400 px-4 py-2 border rounded-md text-white"
                  : "bg-red-400 px-4 py-2 border rounded-md text-white"
              }`}
            />

            {modal.show && modal.type === "skill" ? (
              <Skill
                skills={values.skill}
                onAdd={() => {
                  setFieldValue("skill", [
                    ...values.skill,
                    update?.skill[0].name,
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
            ) : null}

            <ApButton
              type="button"
              name={
                modal.show && modal.type == "skill"
                  ? "close skill form"
                  : "open skill form"
              }
              onClick={() => setModal({ show: !modal.show, type: "skill" })}
              className={`${
                modal.show && modal.type == "skill"
                  ? "bg-green-400 px-4 py-2 border rounded-md text-white"
                  : "bg-red-400 px-4 py-2 border rounded-md text-white"
              }`}
            />

            {modal.show && modal.type === "certificate" ? (
              <Certificate
                certificate={values.certificate}
                onAdd={() =>
                  setFieldValue("certificate", [
                    ...values?.certificate,
                    {
                      name: "",
                    },
                  ])
                }
                onDelete={(index: number) =>
                  setFieldValue(
                    "certificate",
                    values.certificate.filter((a, i) => i !== index)
                  )
                }
              />
            ) : null}

            <ApButton
              type="button"
              name={
                modal.show && modal.type == "certificate"
                  ? "close certificate form"
                  : "open certificate form"
              }
              onClick={() =>
                setModal({ show: !modal.show, type: "certificate" })
              }
              className={`${
                modal.show && modal.type == "certificate"
                  ? "bg-green-400 px-4 py-2 border rounded-md text-white"
                  : "bg-red-400 px-4 py-2 border rounded-md text-white"
              }`}
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
