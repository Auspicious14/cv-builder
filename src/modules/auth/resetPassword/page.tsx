import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { ApTextInput } from "../../../components";
import { useResetPasswordState } from "./context";
import { Button } from "antd";

const FormSchema = Yup.object().shape({
  newPassword: Yup.string().required("new password is required").min(6),
  confirmNewPassword: Yup.string()
    .required("new password is required")
    .min(6)
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export const ResetPasswordPage = () => {
  const router = useRouter();
  const { handleResetPassword, loading } = useResetPasswordState();
  const handleSubmit = async (values: any) => {
    const { confirmNewPassword, ...otherValues } = values;
    const res: any = await handleResetPassword(otherValues);
    if (res) router.push("/auth/login");
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="my-6 mx-4 text-left">
          <h2 className=" text-3xl font-bold tracking-tight text-gray-900">
            Forgot Password?
          </h2>
          <p className="text-[#475467] my-2">
            {"No worries, we'll send you reset instructions"}
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            newPassword: "",
            confirmNewPassword: "",
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
                label="New password"
                name="newPassword"
                type="password"
                placeHolder="*******"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                label="confirm new password"
                name="confirmNewPassword"
                type="password"
                placeHolder="*******"
              />

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Reset Password
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
