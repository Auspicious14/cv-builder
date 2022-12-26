import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApButton, ApTextInput } from "../../../components";
import { ISkill } from "../model";

interface IProps {
  index: number;
  onDelete: () => void;
  skill: ISkill;
}
export const SkillListItem: React.FC<IProps> = ({ index, onDelete, skill }) => {
  return (
    <div className="">
      <ApTextInput
        label="Skill"
        type="text"
        name={`skill[${index}].skillName`}
        className=" p-3 outline-blue-400 rounded-sm"
      />

      <div onClick={onDelete}>
        <MdOutlineDeleteOutline
          size={25}
          className="text-blue-400 mb-2 cursor-pointer"
        />
      </div>
    </div>
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
      <div className=" mt-4 border-t flex justify-end items-center">
        <div onClick={onAdd}>
          <MdAddCircle size={30} className={"text-blue-400 cursor-pointer"} />
        </div>
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
