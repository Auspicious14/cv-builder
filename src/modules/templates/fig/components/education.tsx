import React from "react";
import { IAcademy } from "../../../academic/model";

interface IProps {
  academy: IAcademy;
}

export const FigEducation: React.FC<IProps> = ({ academy }) => {
  return (
    <div>
      <div className="h-[92px] flex-col justify-start items-start gap-5 flex">
        <div className="self-stretch h-14 flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
            <div className="justify-start items-baseline gap-2 inline-flex">
              <div className="text-black text-base font-bold leading-none">
                {academy?.school}
              </div>
              <div className="text-black text-base font-normal leading-none">
                /
              </div>
              <div className="text-black text-base font-normal leading-none">
                BA HCD
              </div>
            </div>
            <div className="self-stretch text-gray-400 text-sm font-normal leading-3">
              {academy?.fromDate - academy?.toDate}
            </div>
          </div>
          <div className="self-stretch text-zinc-500 text-sm font-normal leading-3">
            {academy?.course}
          </div>
        </div>
      </div>
    </div>
  );
};
