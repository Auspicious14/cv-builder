import React from "react";
import { ILanguage } from "../model";
import { CgLoadbar } from "react-icons/cg";

interface IProps {
  language: ILanguage;
}
export const LanguageList: React.FC<IProps> = ({ language }) => {
  return (
    <div>
      <ul>
        <div className="flex gap-2 items-center">
          <CgLoadbar />
          <li>{language?.name}</li>
        </div>
      </ul>
    </div>
  );
};
