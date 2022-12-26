import React from "react";
import { ApSideNav } from "../components/nav/sidenav";
import { ApMainLayOut } from "../modules/layout/mainlayout";
import { SkillContextProvider } from "../modules/skill/context";
import { SkillPage } from "../modules/skill/page";

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
