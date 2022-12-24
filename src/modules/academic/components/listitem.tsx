import React from "react";
import { IAcademy } from "../model";

interface IProps {
  academy: IAcademy;
}
export const AcademyList: React.FC<IProps> = ({ academy }) => {
  return (
    <div>
      <div className="mb-4">
        <p className="font-bold uppercase">{academy?.name}</p>
        <p className="text-sm mb-2">{`From: ${academy?.fromDate} To: ${academy?.toDate}`}</p>
        <p className="font-bold uppercase">{academy?.course}</p>
      </div>
    </div>
  );
};
