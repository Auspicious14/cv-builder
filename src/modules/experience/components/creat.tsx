import React from "react";
import { ApButton, ApTextInput } from "../../../components";
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
        <ApButton
          name="Delete"
          type="button"
          onClick={onDelete}
          className="bg-red-400 px-4 mb-4 text-white border-none rounded-md outline-none "
        />
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
      <div className="mt-4 border-t flex justify-between items-center">
        <p className="py-3 font-bold">EXPERIENCE</p>
        <ApButton
          name="Add"
          type="button"
          onClick={onAdd}
          className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
        />
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
