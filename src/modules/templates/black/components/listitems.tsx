import React from "react";
import { IExperience } from "../../../experience/model";

interface IProps {
  experience: IExperience;
}
export const BlackTemplateExperienceListItem = ({ experience }: IProps) => {
  const fromDate = new Date(experience?.fromDate.toDate()).toDateString();
  const toDate = new Date(experience?.toDate.toDate()).toDateString();
  return (
    <>
      <div>
        <div className="mb-4">
          <div className="w-20 h-[1px] my-2 bg-white"></div>
          <div className="flex gap-2">
            <p className="font-bold">{experience?.jobTitle}</p>
            <span> - </span>
            <p className="font-bold">{experience?.organization}</p>
          </div>
          <p className="text-sm pb-2 text-gray-300">
            {fromDate} - {toDate}
          </p>
          <p className="text-justify">{experience?.description}</p>
        </div>
      </div>
    </>
  );
};
