import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { ApButton, ApTextInput } from "../../components";
import { IPersonalInfo } from "./model";

export const PersonalInformationPage = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <ApTextInput type="text" name="firstName" placeHolder="first name" />
        <ApTextInput type="text" name="lastName" placeHolder="last name" />
        <ApTextInput
          type="text"
          name="phoneNumber"
          placeHolder="phone number"
        />
        <ApTextInput type="text" name="state" placeHolder="state" />
        <ApTextInput type="text" name="city" placeHolder="city" />
        <ApButton
          name="Next --->"
          type="button"
          onClick={() => router.push("/academy")}
        />
      </div>
    </>
  );
};
