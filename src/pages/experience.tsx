import React from "react";
import { ExperienceContextProvider } from "../modules/experience/context";
import { ExperiencePage } from "../modules/experience/page";

const Experience = () => {
  return (
    <>
      <ExperienceContextProvider>
        <ExperiencePage />
      </ExperienceContextProvider>
    </>
  );
};

export default Experience;
