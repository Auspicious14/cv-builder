import React from "react";
import { Bars, ProgressBar, RotatingLines } from "react-loader-spinner";

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

export const ApGenerateButtonLoader = () => {
  return (
    <div>
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#fff"
        barColor="#51E5FF"
      />
    </div>
  );
};
