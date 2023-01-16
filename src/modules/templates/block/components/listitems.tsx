import React from "react";
import { IExperience } from "../../../experience/model";

interface IProps {
  experience: IExperience;
}
export const BlockTemplateExperienceListItem = ({ experience }: IProps) => {
  const fromDate = new Date(experience?.fromDate.toDate()).toDateString();
  const toDate = new Date(experience?.toDate.toDate()).toDateString();
  return (
    <>
      <div>
        <div className="my-4 pb-2  ">
          <div className="flex gap-2 items-center">
            <p className="font-bold">{experience?.jobTitle}</p>
            <div className="w-[2px] h-[1rem] bg-black "></div>
            <p className="font-bold">{experience?.organization}</p>
          </div>
          <p className="font-bold">{experience?.location}</p>
          <p className="text-sm pb-2 text-gray-400">
            {fromDate} - {toDate}
          </p>
          <p className="text-justify">{experience?.description}</p>
        </div>
      </div>
    </>
  );
};
