import React from "react";
import { ISkill } from "../model";
import { CgLoadbar } from "react-icons/cg";

interface IProps {
  skill: ISkill;
}
export const SkillList: React.FC<IProps> = ({ skill }) => {
  return (
    <div>
      <ul>
        <div className="flex gap-2 items-center">
          <CgLoadbar />
          <li>{skill?.skillName}</li>
        </div>
      </ul>
    </div>
  );
};
