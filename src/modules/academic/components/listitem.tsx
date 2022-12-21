import React from "react";
import { IAcademy } from "../model";

interface IProps {
  academy: IAcademy;
}
export const AcademyList: React.FC<IProps> = ({ academy }) => {
  return (
    <div>
      <div className="mb-4">
        <p>{`From: ${academy?.fromDate} To: ${academy?.toDate}`}</p>
        <p className="font-bold">{academy?.name}</p>
        <p className="font-bold">{academy?.course}</p>
      </div>
    </div>
  );
};
