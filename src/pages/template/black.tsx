import React from "react";
import { BlackTemplate } from "../../modules/templates/black/page";
import { getCookie } from "../../services/helper";

const Black = () => {
  return (
    <>
      <BlackTemplate />
    </>
  );
};

export default Black;

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
