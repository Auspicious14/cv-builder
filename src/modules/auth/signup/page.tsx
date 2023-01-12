import { Form, Formik } from "formik";
import React from "react";
import { ApButton, ApTextInput } from "../../../components";
import * as Yup from "yup";
import { auth, signUpUser } from "../../../library/firebase";
import { toastSvc } from "../../../services/toast";
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";
import Link from "next/link";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
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
    response.then((user) => {});
  };

  return (
    <div className="hero w-screen h-screen relative">
      <div className="text-xl flex justify-center items-center text-white font-bold pt-[2rem] pb-[2rem]">
        <Link href={"/"}>CV-CRAFT</Link>
      </div>
      <div className="lg:w-[25rem] w-80 rounded-md m-auto absolute left-[-50%] right-[-50%] py-2 px-4 bg-white">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={FormSchema}
        >
          <Form>
            <h4 className=" text-center font-extrabold text-lg lg:text-2xl mb-5  ">
              Sign Up
            </h4>

            <ApTextInput
              label="First Name"
              placeHolder="Sodiq"
              type="text"
              name="firstName"
              className="p-2 outline-blue-400"
            />

            <ApTextInput
              label="Last Name"
              type="text"
              name="lastName"
              placeHolder="Abdulazeez"
              className="p-2 outline-blue-400"
            />
            <ApTextInput
              label="Email"
              type="email"
              name="email"
              placeHolder="Abdulazeez@gmail.com"
              className="p-2 outline-blue-400"
            />

            <ApTextInput
              label="Password"
              type="password"
              name="password"
              placeHolder="********"
              className="p-2 outline-blue-400"
            />
            <div className="w-full rounded-md bg-blue-700 text-white font-extrabold  text-center py-1 ">
              <ApButton name="Sign up" type="submit" className="  p-2" />
            </div>

            <div className="flex justify-center gap-2 text-center my-2 text-sm">
              <p> Already have an account?</p>
              <Link href={"/auth/signin"} className="text-orange-500">
                Sign in
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
