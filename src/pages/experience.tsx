import React from "react";
import { ExperienceContextProvider } from "../modules/experience/context";
import { ExperiencePage } from "../modules/experience/page";
import { ApMainLayOut } from "../modules/layout/mainlayout";
import { getCookie } from "../services/helper";

const Experience = () => {
  return (
    <>
      <ExperienceContextProvider>
        <ApMainLayOut>
          <ExperiencePage />
        </ApMainLayOut>
      </ExperienceContextProvider>
    </>
  );
};

export default Experience;

export const getServerSideProps = () => {
  const userId = getCookie("user_id");
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
