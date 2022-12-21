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
        label="Skill"
        type="text"
        name={`skill[${index}].skillName`}
        className="p-3 outline-blue-400"
      />
      <ApButton
        name="Delete"
        type="button"
        onClick={onDelete}
        className="bg-red-400 mb-4 px-4 text-white border-none rounded-md outline-none "
      />
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
      <div className="mt-4 border-t flex justify-between items-center">
        <p className="py-3 font-bold">SKILL</p>
        <ApButton
          name="Add"
          type="button"
          onClick={onAdd}
          className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
        />
      </div>
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
