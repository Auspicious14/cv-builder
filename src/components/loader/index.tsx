import React from "react";
import { ColorRing } from "react-loader-spinner";

interface IProps {
  colors: [string, string, string, string, string];
}
export const ApLoader = ({ colors }: IProps) => {
  return (
    <>
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={colors}
      />
    </>
  );
};
