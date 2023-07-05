import React from "react";
import { ApSideNav } from "../components/nav/sidenav";
import { ApMainLayOut } from "../modules/layout/mainlayout";
import { SkillContextProvider } from "../modules/skill/context";
import { SkillPage } from "../modules/skill/page";
import { getCookie } from "../services/helper";

const Skill = () => {
  return (
    <div>
      <SkillContextProvider>
        <ApMainLayOut>
          <SkillPage />
        </ApMainLayOut>
      </SkillContextProvider>
    </div>
  );
};

export default Skill;

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
