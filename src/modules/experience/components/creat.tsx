import moment from "moment";
import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApDateRangePicker, ApTextInput } from "../../../components";
import { IExperience } from "../model";

interface IProps {
  index: number;
  // date: {fromDate: any, toDate: any};
  experience: IExperience;
  onDelete: () => void;
  handleDate: (date: any, index: number) => void;
}
export const ExperienceListItem: React.FC<IProps> = ({
  onDelete,
  index,
  // date,
  experience,
  handleDate,
}) => {
  return (
    <div>
      <div>
        <ApTextInput
          label="Job Title"
          name={`experience[${index}].jobTitle`}
          type="text"
          className="p-3 outline-blue-400"
        />
        <ApTextInput
          label="Organization"
          name={`experience[${index}].organization`}
          type="text"
          className="p-3 outline-blue-400"
        />
        <ApTextInput
          label="Location"
          name={`experience[${index}].location`}
          type="text"
          className="p-3 outline-blue-400"
        />
        <ApTextInput
          label="Description"
          name={`experience[${index}].description`}
          type="textarea"
          className="p-3 outline-blue-400"
        />

        <ApDateRangePicker
          onChange={(date) => handleDate(date, index)}
          date={{
            startDate:
              (experience.fromDate as Date) ||
              moment().startOf("month").toDate(),
            endDate:
              (experience.toDate as Date) || moment().endOf("month").toDate(),
          }}
        />

        <div>
          <MdOutlineDeleteOutline
            size={25}
            className="text-blue-400 mb-2 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

interface IExperienceProps {
  onAdd: () => void;
  onDelete: (index: number) => void;
  experience: IExperience[];
  handleDate: (date: any, i: number) => void;
}

export const Experience: React.FC<IExperienceProps> = ({
  onAdd,
  onDelete,
  experience,
  handleDate,
}) => {
  return (
    <>
      <div className="mt-4  flex justify-end items-center">
        <div onClick={onAdd}>
          <MdAddCircle size={30} className={"text-blue-400 cursor-pointer"} />
        </div>
      </div>
      {experience.map((e, i) => (
        <ExperienceListItem
          experience={e}
          onDelete={() => onDelete(i)}
          index={i}
          key={i}
          handleDate={(date: any, i: number) => handleDate(date, i)}
        />
      ))}
    </>
  );
};
