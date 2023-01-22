import moment from "moment";
import React, { useState } from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import {
  ApButton,
  ApDateRangePicker,
  ApGenerateButtonLoader,
  ApTextInput,
} from "../../../components";
import { useExperienceState } from "../context";
import { ICategory, IExperience } from "../model";

interface IProps {
  index: number;
  value: string;
  experience: IExperience;
  onChange: (e: any) => void;
  onDelete: () => void;
  handleDate: (date: any, index: number) => void;
}
export const ExperienceListItem: React.FC<IProps> = ({
  onDelete,
  index,
  value,
  experience,
  onChange,
  handleDate,
}) => {
  const [category, setCategory] = useState("");

  const { loading, error, result, setResult, getDescriptiveAiInfo } =
    useExperienceState();
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
        {value ? (
          <div className="flex flex-col">
            <label htmlFor="">Description</label>
            <textarea
              name={"description"}
              value={value}
              rows={5}
              cols={30}
              onChange={(e) => {
                e.preventDefault(), onChange(e.target.value);
              }}
              className="p-3 border rounded-md outline-blue-400 w-full"
            />
          </div>
        ) : (
          <ApTextInput
            label="Description"
            name={`experience[${index}].description`}
            type="textarea"
            className="p-3 outline-blue-400"
          />
        )}
        <div className="lg:flex block lg:gap-3 items-center">
          <select
            value={category}
            onChange={(e) => {
              e.preventDefault(), setCategory(e.target.value);
            }}
            className="border px-3 py-1 rounded-md bg-blue-900 text-white"
          >
            {ICategory?.map((m, i) => (
              <option value={m.name} key={i}>
                {m.label}
              </option>
            ))}
          </select>
          <ApButton
            type="button"
            name={loading ? <ApGenerateButtonLoader /> : "Generate Description"}
            className="bg-blue-900 px-2 my-2 py-1 border outline-none rounded-md text-white"
            onClick={getDescriptiveAiInfo}
          />
        </div>
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
  value: string;
  onAdd: () => void;
  onChange: () => void;
  onDelete: (index: number) => void;
  experience: IExperience[];
  handleDate: (date: any, i: number) => void;
}

export const Experience: React.FC<IExperienceProps> = ({
  value,
  onAdd,
  onDelete,
  experience,
  handleDate,
  onChange,
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
          value={value}
          handleDate={(date: any, i: number) => handleDate(date, i)}
          onChange={onChange}
        />
      ))}
    </>
  );
};
