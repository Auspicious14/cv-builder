import React, { useState } from "react";

import { SkillDetail } from "./detail";
import { ISkill } from "./model";

export const SkillPage = () => {
  const [skill, setSkill] = useState<ISkill>();
  return (
    <>
      <div>
        <SkillDetail skill={skill as any} />
      </div>
    </>
  );
};
