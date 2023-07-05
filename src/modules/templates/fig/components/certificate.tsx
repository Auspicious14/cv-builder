import React from "react";
import { ICertificate } from "../../../certificate/model";

interface IProps {
  certificate: ICertificate;
}
export const FigCertificate: React.FC<IProps> = ({ certificate }) => {
  return (
    <div className="self-stretch h-12 flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch h-7 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch justify-start items-start gap-1 inline-flex">
          <div className="text-black text-[9px] font-bold leading-3">
            {certificate?.name}
          </div>
          <div className="text-zinc-500 text-[9px] font-normal leading-3">
            /
          </div>
          <div className="text-zinc-500 text-[9px] font-normal leading-3">
            Cornell University
          </div>
        </div>
        <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
          {certificate?.year}
        </div>
      </div>
      <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
        Top 3% class GPA
      </div>
    </div>
  );
};
