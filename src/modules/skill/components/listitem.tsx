import React from "react";
import { ISkill } from "../model";

interface IProps {
  skill: ISkill;
}
export const SkillList: React.FC<IProps> = ({ skill }) => {
  return (
    <div>
      <ul className="">
        <li>{skill?.skillName}</li>
      </ul>
    </div>
  );
};
