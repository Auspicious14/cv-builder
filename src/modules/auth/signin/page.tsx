import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../../components";
import * as Yup from "yup";
import { signInUser } from "../../../library/firebase";
import { toastSvc } from "../../../services/toast";
import { useRouter } from "next/router";
const FormSchema = Yup.object().shape({
  //   firstName: Yup.string().required("First Name is required"),
  //   lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export const SignInPage = () => {
  const router = useRouter();
  const handleSubmit = (values: any) => {
    if (values) {
      signInUser(values?.email, values?.password)
        .then((res) => {
          console.log(res);
          // toastSvc.success("signed in successfully");
          router.push("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="w-72 m-auto my-12">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        <Form>
          {/* <ApTextInput
            label="First Name"
            type="text"
            name="firstName"
            className="p-4 w-full"
          />
          <ApTextInput
            label="Last Name"
            type="text"
            name="lastName"
            className="p-4 w-full"
          /> */}
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

          <ApButton name="sign in" type="submit" />
        </Form>
      </Formik>
    </div>
  );
};
