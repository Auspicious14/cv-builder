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
        placeHolder=""
      />
      <ApTextInput
        label="course of study"
        type="text"
        name={`academy[${index}].course`}
        placeHolder=""
      />

      <ApTextInput
        label="Date Started"
        type="text"
        name={`academy[${index}].fromDate`}
        placeHolder=""
      />
      <ApTextInput
        label="Date Ended"
        type="text"
        name={`academy[${index}].toDate`}
        placeHolder=""
      />
      <ApButton name="delete" type="button" onClick={onDelete} />
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
      <ApButton name="add" type="button" onClick={onAdd} />
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
