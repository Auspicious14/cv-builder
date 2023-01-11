import React from "react";
import { ApSideNav } from "../../components/nav/sidenav";
import BlockTemplate from "../../../public/block template.png";
import Image from "next/image";

interface IProps {
  children: React.ReactNode;
}

export const ApMainLayOut = ({ children }: IProps) => {
  return (
    <div className="lg:flex lg:gap-2 w-[100%] h-screen xsm:block">
      <div className="w-[20%] bg-blue-900 overflow-y-hidden sm:hidden hidden lg:block">
        <ApSideNav />
      </div>
      <div className="lg:w-[80%] flex gap-2">
        <div className="lg:w-[70%] w-full overflow-auto">{children}</div>
        <div className="w-[50%] overflow-y-hidden hidden sm:hidden lg:block">
          <Image
            src={BlockTemplate}
            alt="Block Template Image"
            width={600}
            height={600}
            className="object-cover opacity-50 h-screen border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
