import React, { useEffect } from "react";
import { userProfile } from "../../library";

export const ProfilePage = () => {
  useEffect(() => {
    userProfile();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};
