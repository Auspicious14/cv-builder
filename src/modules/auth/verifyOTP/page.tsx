import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { useVerifyOTPState } from "./context";
import { Button } from "antd";
import { ApTextInput } from "../../../components";

const FormSchema = Yup.object().shape({
  otp: Yup.string().required("otp is required").max(6),
});

export const VerifyOTPPage = () => {
  const router = useRouter();
  const { handleVerifyOTP, loading } = useVerifyOTPState();
  const handleSubmit = async (values: any) => {
    const res = handleVerifyOTP(values);
    res.then(() => {
      router.push("/auth/reset");
    });
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="my-6 mx-4 text-left">
          <h2 className=" text-3xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
          <p className="text-[#475467] my-2">
            {"We've sent verification code to your mail"}
          </p>
        </div>
        <Formik
          initialValues={{
            otp: "",
            email: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                label="email"
                name="email"
                type="text"
                placeHolder="enter your email"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                label="otp"
                name="otp"
                type="number"
                placeHolder="otp"
              />

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Verify otp
              </Button>
              <div className="flex justify-center items-center">
                <Button type="link" href={"/auth/login"} icon={""}>
                  Back to log in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
