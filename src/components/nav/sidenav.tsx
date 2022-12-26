import React from "react";
import { GrCertificate, GrUserExpert } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { HiAcademicCap } from "react-icons/hi";
import { BsInfoCircleFill } from "react-icons/bs";
import { TbFileCertificate } from "react-icons/tb";
import { FaAward } from "react-icons/fa";
import Link from "next/link";
export const ApSideNav = () => {
  return (
    <>
      <div className="w-full h-full text-amber-300 px-4 py-2">
        <div className="text-2xl font-bold uppercase my-4">resume builder</div>
        <ul className="font-bold mt-8 uppercase">
          <Link href={"/personalInfo"}>
            <div className="flex gap-2 items-center hover:bg-blue-900 hover:border hover:rounded-sm hover:px-2 hover:text-white">
              <BsInfoCircleFill size={20} className="text-white" />
              <li className="py-2">Personal Information</li>
            </div>
          </Link>
          <Link href={"/academy"}>
            <div className="flex gap-2 items-center hover:bg-blue-900 hover:border hover:rounded-sm hover:px-2 hover:text-white">
              <HiAcademicCap size={20} className="text-white" />
              <li className="py-2">Academy</li>
            </div>
          </Link>
          <Link href={"/certificate"}>
            <div className="flex gap-2 items-center hover:bg-blue-900 hover:border hover:rounded-sm hover:px-2 hover:text-white">
              <TbFileCertificate size={20} className="text-white" />
              <li className="py-2">Certificate</li>
            </div>
          </Link>
          <Link href={"/experience"}>
            <div className="flex gap-2 items-center hover:bg-blue-900 hover:border hover:rounded-sm hover:px-2 hover:text-white">
              <FaAward size={20} className="text-white" />
              <li className="py-2">Experience</li>
            </div>
          </Link>
          <Link href={"/skill"}>
            <div className="flex gap-2 items-center hover:bg-blue-900 hover:border hover:rounded-sm hover:px-2 hover:text-white">
              <GiSkills size={20} className="text-white" />
              <li className="py-2">Skill</li>
            </div>
          </Link>
        </ul>
      </div>
    </>
  );
};
