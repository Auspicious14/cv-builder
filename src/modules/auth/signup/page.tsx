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
    <div className="hero w-screen h-screen relative">
      <div className="w-80 m-auto absolute left-[-50%] right-[-50%] my-[6rem] ">
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
            <h4 className=" text-center font-extrabold text-lg mb-5  ">
              Sign Up
            </h4>

            <div className="rounded-sm bg-white my-4 shadow-md w-full px-3 ">
              <ApTextInput
                label="First Name"
                placeHolder="Sodiq"
                type="text"
                name="firstName"
                className="bg-white my-4  outline-none"
              />
            </div>

            <div className="rounded-sm bg-white my-4 shadow-md w-full px-3 ">
              <ApTextInput
                label="Last Name"
                type="text"
                name="lastName"
                placeHolder="Abdulazeez"
                className="bg-white my-4 outline-none"
              />
            </div>
            <div className="rounded-sm bg-white my-4 shadow-md w-full px-3 ">
              <ApTextInput
                label="Email"
                type="email"
                name="email"
                placeHolder="Abdulazeez@gmail.com"
                className="bg-white my-4   outline-none"
              />
            </div>

            <div className="rounded-sm bg-white my-4 shadow-md w-full px-3 ">
              <ApTextInput
                label="Password"
                type="password"
                name="password"
                placeHolder="********"
                className="bg-white my-4   outline-none"
              />
            </div>
            <div className="w-80 bg-blue-700 text-white font-extrabold  text-center py-1 ">
              <ApButton name="Sign up" type="submit" className="  p-2" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
