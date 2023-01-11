import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface IProps {
  title?: string;
  show: boolean;
  children: React.ReactNode;
  possition?: string;
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
    possition ,
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
            height: "100%",
            zIndex: 20,
          }}
        >
          <div
            style={{ zIndex: 100 }}
            className={` bg-white overflow-hidden overflow-y-hidden h-screen fixed top-0 bottom-0 right-0 ${possition} ${
              notOverflow ? null : "overflow-y-scroll"
            }  ${containerClassName}`}
          >
            <div className="flex justify-between px-4 py-2 bg-black items-center ">
              {title && (
                <h1 className="text-lg font-bold uppercase  w-full text-white">
                  {title}
                </h1>
              )}
              <IoMdClose
                cursor="pointer"
                size="20"
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
