import React from "react";
import { FiGPage } from "../../modules/templates/fig/fig";
import { getCookie } from "../../services/helper";

const Fig = () => {
  return <FiGPage />;
};

export default Fig;

export const getServerSideProps = ({ req }: any) => {
  const userId = req?.cookies?.user_id;
  console.log(userId);
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
