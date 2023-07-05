import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApTextInput } from "../../../components";
import { ILanguage } from "../model";

interface IProps {
  index: number;
  language: ILanguage;
  onDelete: () => void;
}
export const LanguageListItem: React.FC<IProps> = ({ index, onDelete, language }) => {
  return (
    <>
      <ApTextInput
        label="Name"
        type="text"
        name={`language[${index}].name`}
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
interface ILanguageProps {
  languages: ILanguage[];
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const Language: React.FC<ILanguageProps> = ({ languages, onAdd, onDelete }) => {
  return (
    <>
      <div className=" mt-4  flex justify-end items-center">
        <div onClick={onAdd}>
          <MdAddCircle size={30} className={"text-blue-400 cursor-pointer"} />
        </div>
      </div>
      {languages?.map((s, i) => (
        <LanguageListItem
          language={s}
          onDelete={() => onDelete(i)}
          key={i}
          index={i}
        />
      ))}
    </>
  );
};
