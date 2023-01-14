import React from "react";
import { Bars, ColorRing } from "react-loader-spinner";

interface IProps {
  colors?: [string, string, string, string, string];
  color?: string;
}
export const ApLoader = ({ colors, color }: IProps) => {
  return (
    <>
      <Bars
        visible={true}
        height="150"
        width="150 "
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        // colors={colors}
        color={color}
      />
    </>
  );
};
