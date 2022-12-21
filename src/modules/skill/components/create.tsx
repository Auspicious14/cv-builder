import React from "react";
import { ApButton, ApTextInput } from "../../../components";
import { ISkill } from "../model";

interface IProps {
  index: number;
  onDelete: () => void;
  skill: ISkill;
}
export const SkillListItem: React.FC<IProps> = ({ index, onDelete, skill }) => {
  return (
    <>
      <ApTextInput
        label="skill"
        type="text"
        name={`skill[${index}].skillName`}
        placeHolder=""
      />
      <ApButton name="delete" type="button" onClick={onDelete} />
    </>
  );
};
interface ISKillProps {
  onAdd: () => void;
  onDelete: (index: number) => void;
  skills: ISkill[];
}
export const Skill: React.FC<ISKillProps> = ({ skills, onAdd, onDelete }) => {
  return (
    <>
      <ApButton name="Add" type="button" onClick={onAdd} />
      {skills?.map((skill, i) => (
        <SkillListItem
          skill={skill}
          onDelete={() => onDelete(i)}
          key={i}
          index={i}
        />
      ))}
    </>
  );
};
