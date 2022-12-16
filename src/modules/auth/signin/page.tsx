import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../../components";
import * as Yup from "yup";
import {
  createUserDocument,
  signInUser,
  signInWithGooglePopUp,
} from "../../../library/firebase";
import { toastSvc } from "../../../services/toast";
import { useRouter } from "next/router";
const FormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export const SignInPage = () => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (values) {
      await signInUser(values.email, values.password)
        .then((res) => {
          router.push("/");
        })
        .catch((err) => console.log(err));
    }
  };

  const signInWithGoogle = async () => {
    const response = (await signInWithGooglePopUp()).user;
    console.log(response);
    createUserDocument(response);
  };

  return (
    <div className="w-72 m-auto my-12">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        <Form>
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
      <ApButton
        name="sign in with google"
        type="button"
        onClick={signInWithGoogle}
      />
    </div>
  );
};
