import React from "react";
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
      <ApButton
        name="Delete"
        type="button"
        onClick={onDelete}
        className="bg-red-400 px-4 mb-4 text-white border-none rounded-md outline-none "
      />
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
      <div className="mt-4 border-t flex justify-between items-center">
        <p className="py-3 font-bold">EDUCATION</p>
        <ApButton
          name="Add"
          type="button"
          onClick={onAdd}
          className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
        />
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
