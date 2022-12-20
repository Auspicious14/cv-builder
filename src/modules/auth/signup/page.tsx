import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../../components";
import * as Yup from "yup";
import { auth, signUpUser } from "../../../library/firebase";
import { toastSvc } from "../../../services/toast";
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SignUpPage = () => {
  const router = useRouter();

  const handleSubmit = (values: any) => {
    const response = signUpUser(values.email, values.password, {
      displayName: values.firstName,
      lastName: values.lastName,
    });
    response.then((user) => {
      // console.log("signed up", user);
    });
    // response.then(async (res) => {
    //   const user = auth.currentUser;
    //   await updateProfile(user as any, {
    //     displayName: values.name,
    //   }).then((res) => console.log(res, "signed up!!!"));
    // });
  };

  return (
    <div className="w-72 m-auto my-12">
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        <Form>
          <ApTextInput
            label="Display Name"
            type="text"
            name="firstName"
            className="p-4 w-full"
          />
          <ApTextInput
            label="Last Name"
            type="text"
            name="lastName"
            className="p-4 w-full"
          />

          <ApTextInput
            label="Email"
            type="email"
            name="email"
            className="p-4 w-full"
          />
          <ApTextInput
            label="Password"
            type="password"
            name="password"
            className="p-4 w-full"
          />

          <ApButton name="sign up" type="submit" className="bg-sky-400 p-2" />
        </Form>
      </Formik>
    </div>
  );
};
