import React from "react";
import { ProfilePage } from "../modules/profile/page";
import { getCookie } from "../services/helper";

const Profile = () => {
  return (
    <>
      <ProfilePage />
    </>
  );
};

export default Profile;

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
