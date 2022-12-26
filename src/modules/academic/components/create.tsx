import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApButton, ApTextInput } from "../../../components";
import { IAcademy } from "../model";

interface IProps {
  onDelete: () => void;
  academy: IAcademy;
  index: number;
}
export const AcademyListItem: React.FC<IProps> = ({
  onDelete,
  index,
  academy,
}) => {
  return (
    <>
      <ApTextInput
        label="Name of School"
        type="text"
        name={`academy[${index}].name`}
        className="p-3 outline-blue-400"
      />
      <ApTextInput
        label="course of study"
        type="text"
        name={`academy[${index}].course`}
        className="p-3 outline-blue-400"
      />

      <ApTextInput
        label="Date Started"
        type="text"
        name={`academy[${index}].fromDate`}
        className="p-3 outline-blue-400"
      />
      <ApTextInput
        label="Date Ended"
        type="text"
        name={`academy[${index}].toDate`}
        className="p-3 outline-blue-400"
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

interface IAcademyProps {
  onAdd: () => void;
  onDelete: (index: number) => void;
  academy: IAcademy[];
}
export const Academy: React.FC<IAcademyProps> = ({
  onAdd,
  onDelete,
  academy,
}) => {
  return (
    <>
      <div className="mt-4 flex justify-end items-center">
        <div onClick={onAdd}>
          <MdAddCircle size={30} className={"text-blue-400 cursor-pointer"} />
        </div>
      </div>
      {academy?.map((a, i) => (
        <AcademyListItem
          academy={a}
          onDelete={() => onDelete(i)}
          index={i}
          key={i}
        />
      ))}
    </>
  );
};
