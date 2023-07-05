import React from "react";
import { IExperience } from "../../../experience/model";

interface IProps {
  experience: IExperience;
}
export const FigExperience: React.FC<IProps> = ({ experience }) => {
  return (
    <div className="self-stretch h-28 flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch justify-start items-baseline gap-2 inline-flex">
          <div className="text-black text-base font-bold leading-none">
            {experience?.company}
          </div>
          <div className="text-black text-base font-normal leading-none">/</div>
          <div className="text-black text-base font-normal leading-none">
            {experience?.jobTitle}
          </div>
        </div>
        <div className="self-stretch text-gray-400 text-sm font-normal leading-3">
          {experience?.fromDate - experience?.toDate}
        </div>
      </div>
      <div className="self-stretch text-zinc-500 text-sm font-normal leading-3">
        {experience?.description}
      </div>
    </div>
  );
};
