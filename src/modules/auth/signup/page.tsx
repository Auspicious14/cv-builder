import { Form, Formik } from "formik";
import React, { useState } from "react";
import { ApAuthLoader, ApButton, ApTextInput } from "../../../components";
import * as Yup from "yup";
import { auth, signUpUser } from "../../../library/firebase";
import { toastSvc } from "../../../services/toast";
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";
import Link from "next/link";
import { useSignUpState } from "./context";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required").min(8),
});

export const SignUpPage = () => {
  const { handleSignUp } = useSignUpState();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (values: any) => {
    setLoading(true);
    const response = handleSignUp(values);
    response.then((user) => {
      setLoading(false);
      console.log(user);
      router.push("/auth/signin");
    });
  };

  return (
    <div className="hero w-screen h-screen relative">
      <div className="text-xl flex justify-center items-center text-white font-bold pt-[2rem] pb-4">
        <Link href={"/"}>CV-CRAFT</Link>
      </div>
      <div className="lg:w-[25rem] w-80 rounded-md m-auto absolute left-[-50%] right-[-50%] py-2 px-4 bg-white">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            profession: "",
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
              placeHolder="John"
              type="text"
              name="firstName"
              className="p-2 outline-blue-400"
            />

            <ApTextInput
              label="Last Name"
              type="text"
              name="lastName"
              placeHolder="Doe"
              className="p-2 outline-blue-400"
            />
            <ApTextInput
              label="Profession"
              type="text"
              name="profession"
              placeHolder="Software Engineer"
              className="p-2 outline-blue-400"
            />
            <ApTextInput
              label="Email"
              type="email"
              name="email"
              placeHolder="johndoe@example.com"
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
              <ApButton
                name={loading ? <ApAuthLoader /> : "Sign up"}
                type="submit"
                className="  p-2"
              />
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
