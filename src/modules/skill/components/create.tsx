import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApTextInput } from "../../../components";
import { ISkill } from "../model";

interface IProps {
  index: number;
  skill: ISkill;
  onDelete: () => void;
}
export const SkillListItem: React.FC<IProps> = ({ index, onDelete, skill }) => {
  return (
    <>
      <ApTextInput
        label="Name"
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
    </>
  );
};
interface ISKillProps {
  skills: ISkill[];
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const Skill: React.FC<ISKillProps> = ({ skills, onAdd, onDelete }) => {
  return (
    <>
      <div className=" mt-4  flex justify-end items-center">
        <div onClick={onAdd}>
          <MdAddCircle size={30} className={"text-blue-400 cursor-pointer"} />
        </div>
      </div>
      {skills?.map((s, i) => (
        <SkillListItem
          skill={s}
          onDelete={() => onDelete(i)}
          key={i}
          index={i}
        />
      ))}
    </>
  );
};
