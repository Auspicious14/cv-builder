import React from "react";
import { BlendTemplate } from "../../modules/templates/blend";
import { getCookie } from "../../services/helper";

const Blend = () => {
  return (
    <>
      <BlendTemplate />
    </>
  );
};

export default Blend;

export const getServerSideProps = ({ req }: any) => {
  const userId = req?.cookies?.user_id;
  if (!userId)
    return {
      redirect: {
        destination: "/auth/signin",
        permenant: false,
      },
    };

  return {
    props: {},
  };
};
