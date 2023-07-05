import React from "react";
import { IPersonalInfo } from "../../../personalinfo/model";

interface IProps {
  personalInfo: IPersonalInfo;
}
export const FigPersonalIfo: React.FC<IProps> = ({ personalInfo }) => {
  return (
    <div className="self-stretch justify-start items-start gap-[34px] inline-flex">
      <div className="w-[287px] flex-col justify-start items-start gap-1 inline-flex">
        <div className="text-center text-black text-[20px] font-bold leading-normal">
          {`${personalInfo?.firstName} ${personalInfo?.firstName}`}
        </div>
        <div className="text-gray-400 text-[20px] font-bold leading-normal">
          {personalInfo?.profession}
        </div>
      </div>
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
        <div className="text-center text-black text-[9px] font-normal leading-3">
          {personalInfo?.email}
        </div>
        <div className="text-center text-black text-[9px] font-normal leading-3">
          {personalInfo?.phoneNumber}
        </div>
      </div>
    </div>
  );
};
