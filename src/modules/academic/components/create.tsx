import moment from "moment";
import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApButton, ApDateRangePicker, ApTextInput } from "../../../components";
import { IAcademy } from "../model";

interface IProps {
  onDelete: () => void;
  academic: IAcademy;
  index: number;
  handleDate: (date: any, index: number) => void;
}
export const AcademyListItem: React.FC<IProps> = ({
  onDelete,
  index,
  academic,
  handleDate,
}) => {
  return (
    <>
      <ApTextInput
        label="Name of School"
        type="text"
        name={`academic[${index}].school`}
        className="p-3 outline-blue-400"
      />
      <ApTextInput
        label="Name of School"
        type="text"
        name={`academic[${index}].degree`}
        className="p-3 outline-blue-400"
      />
      <ApTextInput
        label="course of study"
        type="text"
        name={`academic[${index}].course`}
        className="p-3 outline-blue-400"
      />
      <ApDateRangePicker
        onChange={(date) => {
          handleDate(date, index);
          // console.log(date.startDate)
        }}
        date={{
          startDate:
            (academic.fromDate as Date) || moment().startOf("month").toDate(),
          endDate:
            (academic.toDate as Date) || moment().endOf("month").toDate(),
        }}
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
  handleDate: (date: any, index: number) => void;
}
export const Academy: React.FC<IAcademyProps> = ({
  onAdd,
  onDelete,
  academy,
  handleDate,
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
          academic={a}
          onDelete={() => onDelete(i)}
          index={i}
          key={i}
          handleDate={(date: any, i: number) => handleDate(date, i)}
        />
      ))}
    </>
  );
};
