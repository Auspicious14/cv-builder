import { Form, Formik } from "formik";
import React, { useState } from "react";
import { ApAuthLoader, ApButton, ApTextInput } from "../../../components";
import * as Yup from "yup";
import {
  createUserDocument,
  signInUser,
  signInWithGooglePopUp,
} from "../../../library/firebase";
import { toastSvc } from "../../../services/toast";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiFillTwitterCircle } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { useSignInState } from "./context";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(8),
});
export const SignInPage = () => {
  const { handleSignIn, loading } = useSignInState();
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const res: any = await handleSignIn(values);
    if (res) router.push("/personalInfo");
  };

  const signInWithGoogle = async () => {
    const response = (await signInWithGooglePopUp()).user;
    console.log(response);
    createUserDocument(response);
    router.push("/personalInfo");
  };

  return (
    <>
      <div className="hero w-screen h-screen relative ">
        <div className="text-xl flex justify-center items-center text-white font-bold pt-[2rem] pb-[2rem]">
          <Link href={"/"}>CV-CRAFT</Link>
        </div>
        <div className="lg:w-[25rem] w-80 rounded-md m-auto absolute left-[-50%] right-[-50%]  py-2 px-4 bg-white">
          {" "}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={FormSchema}
          >
            <>
              <h4 className=" text-center font-extrabold text-lg mb-5 ">
                Sign In
              </h4>

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
                placeHolder="*********"
                className="p-2 outline-blue-400"
              />

              <div className="cursor-pointer w-full rounded-md bg-blue-700 text-white font-extrabold  text-center py-1 ">
                <ApButton
                  name={"Sign In"}
                  isLoading={loading}
                  leftIcon={loading ? <ApAuthLoader /> : null}
                  type="submit"
                  className="  p-2"
                />
              </div>
              <div className="flex justify-center gap-2 text-center my-2 text-sm">
                <p>{"Don't have an account?"}</p>
                <Link href={"/auth/signup"} className="text-orange-500">
                  Sign up
                </Link>
              </div>
              <div className="flex gap-x-4 items-center my-4">
                <div className="w-full h-[2px]  bg-white"></div>
                <h4 className="font-bold">Or</h4>
                <div className="w-full h-[2px]  bg-white"></div>
              </div>
              <div>
                <div className="grid gap-2 grid-cols-1">
                  <div className="flex lg:px-[3.5rem]  items-center justify-center gap-x-3 border rounded-md  py-2 ">
                    <FcGoogle size={30} />
                    <ApButton
                      name="Sign in with Google"
                      type="button"
                      onClick={signInWithGoogle}
                    />
                  </div>

                  <div className="flex items-center justify-center text-white gap-x-3 bg-[#4267B2] py-2 rounded-md">
                    <AiFillFacebook color="white" size={30} />
                    <ApButton
                      name="Sign in with Facebook"
                      type="button"
                      onClick={signInWithGoogle}
                    />
                  </div>

                  <div className="flex  text-white items-center justify-center lg:px-[3.5rem] gap-x-3 bg-[#1DA1F2]  py-2 rounded-md">
                    <AiFillTwitterCircle color="white" size={30} />
                    <ApButton
                      name="Sign in with Twitter"
                      type="button"
                      onClick={signInWithGoogle}
                    />
                  </div>
                </div>
              </div>
            </>
          </Formik>
        </div>
      </div>
    </>
  );
};
