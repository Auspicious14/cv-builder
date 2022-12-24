import React from "react";
import { ApButton, ApTextInput } from "../../../components";
import { ICertificate } from "../model";

interface IProps {
  onDelete: () => void;
  certificate: ICertificate;
  index: number;
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

      <ApButton
        name="Delete"
        type="button"
        onClick={onDelete}
        className="bg-red-400 px-4 mb-4 text-white border-none rounded-md outline-none "
      />
    </>
  );
};

interface ICertificateProps {
  onAdd: () => void;
  onDelete: (index: number) => void;
  certificate: ICertificate[];
}
export const Certificate: React.FC<ICertificateProps> = ({
  onAdd,
  onDelete,
  certificate,
}) => {
  return (
    <>
      <div className="mt-4 border-t flex justify-between items-center">
        <p className="py-3 font-bold">CERTIFICATION</p>
        <ApButton
          name="Add"
          type="button"
          onClick={onAdd}
          className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
        />
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
