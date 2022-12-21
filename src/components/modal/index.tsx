import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IProps {
  title?: string;
  show: boolean;
  children: React.ReactNode;
  possition?: "left" | "right";
  onDimiss?: () => void;
  closeBtnClassName?: string;
  containerClassName?: string;
  notOverflow?: boolean;
}

export const ApModal: React.FC<IProps> = ({
  title,
  show,
  closeBtnClassName,
  containerClassName,
  children,
  //   possition = "right",
  onDimiss,
  notOverflow,
}) => {
  return (
    <>
      {show && (
        <div
          className="w-full fixed top-0 left-0 bottom-0"
          style={{
            background: "#403c3c75",
            height: "100vw",
            zIndex: 20,
          }}
        >
          <div
            style={{ zIndex: 100 }}
            className={` bg-white overflow-hidden h-screen fixed top-0 bottom-0 right-0 left-0 px-4 ${
              notOverflow ? null : "overflow-y-scroll"
            }  ${containerClassName}`}
          >
            <div className="flex justify-between  bg-blue-400  items-center ">
              {title && (
                <h1 className="text-lg font-bold uppercase  w-full text-white p-4">
                  {title}
                </h1>
              )}
              <AiOutlineClose
                cursor="pointer"
                size="30"
                onClick={onDimiss}
                className={` z-50 text-white  ${closeBtnClassName}`}
              />
            </div>

            {children}
          </div>
        </div>
      )}
    </>
  );
};
