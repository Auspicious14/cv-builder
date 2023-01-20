import React from "react";
import { Bars, RotatingLines } from "react-loader-spinner";

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

export const ApAuthLoader = () => {
  return (
    <div>
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </div>
  );
};
