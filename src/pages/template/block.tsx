import React from "react";
import { BlockTemplate } from "../../modules/templates/block/page";
import { getCookie } from "../../services/helper";

const Block = () => {
  return (
    <div className="bg-stone-200">
      <BlockTemplate />
    </div>
  );
};

export default Block;

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
