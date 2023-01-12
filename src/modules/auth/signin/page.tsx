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
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiFillTwitterCircle } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";

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
          router.push("/personalInfo");
        })
        .catch((err) => console.log(err));
    }
  };

  const signInWithGoogle = async () => {
    const response = (await signInWithGooglePopUp()).user;
    console.log(response);
    createUserDocument(response);
    router.push("/personalInfo");
  };

  return (
    <div className="hero w-screen h-screen relative">
      <div className="w-[25rem] rounded-md m-auto absolute left-[-50%] right-[-50%] my-[6rem] py-2 px-4 bg-white">
        {" "}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={FormSchema}
        >
          <Form>
            <h4 className=" text-center font-extrabold text-lg mb-5 ">
              Sign In
            </h4>

            <div className="flex gap-2 items-center">
              <HiOutlineMail size={25} />
              <ApTextInput
                label="Email"
                type="email"
                name="email"
                props={<HiOutlineMail size={20} />}
                placeHolder="Email"
                className="p-2 outline-blue-400"
                components={<HiOutlineMail size={20} />}
              />
            </div>

            <div
              className="flex items-center
          rounded-sm  bg-white shadow-md w-full px-3 my-3  "
            >
              <div className="mr-4">
                <RiLockPasswordLine color="" size={25} />
              </div>
              <div>
                <ApTextInput
                  // label="Password"
                  type="password"
                  name="password"
                  placeHolder="password"
                  className=" rounded-sm my-6 bg-white  outline-0"
                />
              </div>
            </div>

            <div className="flex justify-center align-center">
              <div>
                <ApButton
                  name="sign in"
                  type="submit"
                  className="bg-blue-200  py-3 rounded-sm w-80
              "
                />
                <div className="flex gap-x-4 items-center my-4">
                  <div className="w-full h-[2px]  bg-white"></div>
                  <h4 className="font-bold">Or</h4>
                  <div className="w-full h-[2px]  bg-white"></div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="grid gap-2 grid-cols-1">
                    <div className="flex px-[3.5rem]  items-center gap-x-3 bg-red-300 w-80 py-2 ">
                      <FcGoogle size={30} />
                      <ApButton
                        name="Sign in with Google"
                        type="button"
                        onClick={signInWithGoogle}
                      />
                    </div>
                    <div
                      className="flex items-center gap-x-3 bg-[#3b5996]
                   py-2 px-[3.5rem] w-80 mx-auto"
                    >
                      <AiFillFacebook color="white" size={30} />
                      <ApButton
                        name="Sign in with Facebook"
                        type="button"
                        onClick={signInWithGoogle}
                      />
                    </div>

                    <div
                      className="flex  items-center 
                  px-[3.5rem] gap-x-3 bg-[#00acee] w-80 py-2 "
                    >
                      <AiFillTwitterCircle color="white" size={30} />
                      <ApButton
                        name="Sign in with Twitter"
                        type="button"
                        onClick={signInWithGoogle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
