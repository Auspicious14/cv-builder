import React from "react";
import { CgLoadbar } from "react-icons/cg";
import { ICertificate } from "../model";

interface IProps {
  certificate: ICertificate;
}
export const CertificateList: React.FC<IProps> = ({ certificate }) => {
  return (
    <ul>
      <div className="flex gap-2 items-center mb-4">
        <CgLoadbar />
        <p className="font-bold uppercase text-sm">{certificate?.name}</p>
      </div>
    </ul>
  );
};
