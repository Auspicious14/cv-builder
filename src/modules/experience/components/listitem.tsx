import React from "react";
import { IExperience } from "../model";

interface IProps {
  experience: IExperience;
}
export const ExperienceList: React.FC<IProps> = ({ experience }) => {
  return (
    <div>
      <div className="mb-4">
        <p>{`From: ${experience?.fromDate} To: ${experience?.toDate}`}</p>
        <p className="font-bold">{experience?.jobTitle}</p>
        <p className="font-bold">{experience?.organization}</p>
        <p className="text-justify">{experience?.description}</p>
      </div>
    </div>
  );
};
