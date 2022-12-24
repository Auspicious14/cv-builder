import React from "react";
import { IExperience } from "../../../experience/model";

interface IProps {
  experience: IExperience;
}
export const BlockTemplateExperienceListItem = ({ experience }: IProps) => {
  return (
    <>
      <div>
        <div className="my-4 pb-2  ">
          <div className="flex gap-2 items-center">
            <p className="font-bold">{experience?.jobTitle}</p>
            <div className="w-[2px] h-[1rem] bg-black "></div>
            <p className="font-bold">{experience?.organization}</p>
          </div>
          <p className="text-sm pb-2 text-gray-400">{` ${experience?.fromDate} - ${experience?.toDate}`}</p>
          <p className="text-justify">{experience?.description}</p>
        </div>
      </div>
    </>
  );
};
