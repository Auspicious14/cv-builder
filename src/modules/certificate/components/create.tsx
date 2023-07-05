import React from "react";
import { MdAddCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { ApTextInput } from "../../../components";
import { ICertificate } from "../model";

interface IProps {
  index: number;
  certificate: ICertificate;
  onDelete: () => void;
}
export const CertificateListItem: React.FC<IProps> = ({
  onDelete,
  index,
  certificate,
}) => {
  return (
    <>
      <ApTextInput
        label="Name"
        type="text"
        name={`certificate[${index}].name`}
        className="p-3 outline-blue-400"
      />
      <ApTextInput
        label="Name"
        type="text"
        name={`certificate[${index}].school`}
        className="p-3 outline-blue-400"
      />
      <ApTextInput
        label="Year"
        type="text"
        name={`certificate[${index}].year`}
        className="p-3 outline-blue-400"
      />
      <ApTextInput
        label="Year"
        type="text"
        name={`certificate[${index}].description`}
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

interface ICertificateProps {
  certificate: ICertificate[];
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const Certificate: React.FC<ICertificateProps> = ({
  onAdd,
  onDelete,
  certificate,
}) => {
  return (
    <>
      <div className="mt-4 flex justify-end items-center">
        <div onClick={onAdd}>
          <MdAddCircle size={30} className={"text-blue-400 cursor-pointer"} />
        </div>
      </div>
      {certificate?.map((a, i) => (
        <CertificateListItem
          certificate={a}
          onDelete={() => onDelete(i)}
          index={i}
          key={i}
        />
      ))}
    </>
  );
};
