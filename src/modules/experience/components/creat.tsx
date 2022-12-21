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
        />
        <ApTextInput
          label="Organization"
          name={`experience[${index}].organization`}
          type="text"
        />
        <ApTextInput
          name={`experience[${index}].description`}
          type="textarea"
        />
        <ApTextInput
          label="Start Date"
          name={`experience[${index}].fromDate`}
          type="text"
        />
        <ApTextInput
          label="End Date"
          name={`experience[${index}].toDate`}
          type="text"
        />
        <ApButton name="delete" type="button" onClick={onDelete} />
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
      <ApButton name="add" type="button" onClick={onAdd} />
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
