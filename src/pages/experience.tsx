import React from "react";
import { ExperienceContextProvider } from "../modules/experience/context";
import { ExperiencePage } from "../modules/experience/page";
import { ApMainLayOut } from "../modules/layout/mainlayout";

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
