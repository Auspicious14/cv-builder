import React from "react";
import { ISkill } from "../../../skill/model";

interface IProps {
  skill: ISkill;
}

export const FigSkill: React.FC<IProps> = ({ skill }) => {
  return (
    <div className="w-[191px] text-zinc-500 text-sm font-normal leading-3">
      {skill?.name}
    </div>
  );
};
