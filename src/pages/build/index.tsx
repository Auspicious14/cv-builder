import React from "react";
import { CVContetxProvider } from "../../modules/buildcv/context";
import { BuildCVDetail } from "../../modules/buildcv/detail";
import { ICV } from "../../modules/buildcv/model";

interface IProps {
  cv: ICV;
}
const BuildDetail: React.FC<IProps> = ({ cv }) => {
  return (
    <>
      <CVContetxProvider>
        <BuildCVDetail cv={cv} />
      </CVContetxProvider>
    </>
  );
};

export default BuildDetail;
