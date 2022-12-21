import React, { useState } from "react";
import { ExperienceDetail } from "./detail";
import { IExperience } from "./model";

export const ExperiencePage = () => {
  const [experience, setExperience] = useState<IExperience>() as any;
  return (
    <>
      <ExperienceDetail experience={experience} />
    </>
  );
};
