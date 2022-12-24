import React from "react";
import { IExperience } from "../model";

interface IProps {
  experience: IExperience;
}
export const ExperienceList: React.FC<IProps> = ({ experience }) => {
  return (
    <div>
      <div className="mb-4">
        <div className="flex gap-2">
          <p className="font-bold">{experience?.jobTitle}</p>
          <span> - </span>
          <p className="font-bold">{experience?.organization}</p>
        </div>
        <p className="font-bold">{experience?.location}</p>
        <p className="text-sm pb-2 text-gray-400">{`${experience?.fromDate} - ${experience?.toDate}`}</p>
        <p className="text-justify">{experience?.description}</p>
      </div>
    </div>
  );
};
