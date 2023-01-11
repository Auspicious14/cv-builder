import React from "react";
import { ApSideNav } from "../../components/nav/sidenav";
import BlockTemplate from "../../../public/block template.png";
import Image from "next/image";

interface IProps {
  children: React.ReactNode;
}

export const ApMainLayOut = ({ children }: IProps) => {
  return (
    <div className="flex gap-2 w-[100%] h-screen">
      <div className="w-[20%] bg-blue-900 overflow-y-hidden sm:hidden">
        <ApSideNav />
      </div>
      <div className="w-[80%] flex gap-2">
        <div className="w-[70%] overflow-auto">{children}</div>
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
