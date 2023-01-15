import React from "react";
import { IAcademy } from "../model";

interface IProps {
  academy: IAcademy;
}
export const AcademyList: React.FC<IProps> = ({ academy }) => {
  const fromDate = new Date(academy?.fromDate.toDate()).toDateString();
  const toDate = new Date(academy?.toDate.toDate()).toDateString();

  return (
    <div>
      <div className="mb-4">
        <p className="font-bold uppercase">{academy?.name}</p>
        <p className="text-sm mb-2 text-gray-400">
          {fromDate} - {toDate}
        </p>
        <p className=" uppercase text-sm">{academy?.course}</p>
      </div>
    </div>
  );
};
