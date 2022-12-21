import React from "react";
import { AcademyPage } from "../academic/page";
import { ExperiencePage } from "../experience/page";
import { PersonalInformationPage } from "../personalinfo/page";
import { SkillPage } from "../skill/page";
import { ICV } from "./model";

interface IProps {
  update: ICV;
}
export const UpdateCVModal: React.FC<IProps> = ({ update }) => {
  return (
    <>
      <PersonalInformationPage />
      <AcademyPage />
      <SkillPage />
      <ExperiencePage />
    </>
  );
};
