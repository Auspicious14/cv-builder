import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApTextInput } from "../../../components";
import { IExperience } from "../model";

interface IProps {
  onDelete: () => void;
  index: number;
  experience: IExperience;
}
export const ExperienceListItem: React.FC<IProps> = ({
  onDelete,
  index,
  experience,
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
          name={`experience[${index}].description`}
          type="textarea"
          className="p-3 outline-blue-400"
        />
        <ApTextInput
          label="Start Date"
          name={`experience[${index}].fromDate`}
          type="text"
          className="p-3 outline-blue-400"
        />
        <ApTextInput
          label="End Date"
          name={`experience[${index}].toDate`}
          type="text"
          className="p-3 outline-blue-400"
        />
        <div onClick={onDelete}>
          <MdOutlineDeleteOutline
            size={25}
            className="text-blue-400 mb-2 cursor-pointer"
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
}
export const Experience: React.FC<IExperienceProps> = ({
  onAdd,
  onDelete,
  experience,
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
        />
      ))}
    </>
  );
};
