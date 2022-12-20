import { useRouter } from "next/router";
import React, { useState } from "react";
import { ApButton, ApTextInput } from "../../components";
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
