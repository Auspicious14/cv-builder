import React from "react";
import { SkillContextProvider } from "../modules/skill/context";
import { SkillPage } from "../modules/skill/page";

const Skill = () => {
  return (
    <div>
      <SkillContextProvider>
        <SkillPage />
      </SkillContextProvider>
    </div>
  );
};

export default Skill;
