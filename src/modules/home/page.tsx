import React from "react";
import Image from "next/image";
import { Mainlayout } from "../layout/layout";
import HomeImage from "../../../public/resumes.png";
import ResumeImage from "../../../public/resume1.png";
import { BsArrowRight, BsBriefcase } from "react-icons/bs";
import { MdDownload, MdExtension, MdFreeBreakfast } from "react-icons/md";
import { AiTwotoneMedicineBox } from "react-icons/ai";
import { Template } from "./components/template";
import { HiOutlineDuplicate } from "react-icons/hi";
import Link from "next/link";

export const HomePage = () => {
  return (
    <div className="">
      <Mainlayout>
        <div className="bg-black ">
          <div
            className=" w-[97%]  block py-4
           sm:block 
          md:flex md:justify-between
           lg:flex lg:justify-between lg:py-[3rem] lg:items-center  lg:w-[75%] lg:mx-auto"
          >
            <div
              className="w-[100%] text-center 
            sm:text-center 
             md:text-left 
             lg:text-left lg:w-[37rem]"
            >
              <h4
                className="text-white font-bold px-4 text-[2rem] tracking-normal leading-[2.5rem] my-3 
              sm:text-[2.5rem]
              md:text-[2.5rem]
               "
              >
                Make your <span className="uppercase">cv</span> stand out from
                the majority
              </h4>
              <p
                className="text-white text-[1.1rem] leading-[1.3rem] my-4
              sm:text-[1.3rem] sm:leading-[1.7rem] px-4 tracking-wide"
              >
                Our professional Resume Builder has helped thousands of job
                seekers land more interviews and get hired faster.
              </p>
              <div>
                <div
                  className="flex gap-x-3 px-4 py-2 bg-blue-700 
                rounded-md my-3 w-[13rem] items-center mx-auto lg:mx-4 "
                >
                  <Link href={"/auth/signup"}>
                    <button className=" text-white font-bold ">
                      Sign up to build cv
                    </button>
                  </Link>
                  <BsArrowRight color="white" size={20} />
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-[80%] mx-auto my-6 ">
                <Image
                  src={HomeImage}
                  alt="HomeImage"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ............................ */}

        <div className="py-12 w-[80%] mx-auto">
          <div>
            <div className="w-[100%] mx-auto md:w-[50%] lg:w-[50%]">
              <h4
                className="
              text-current text-center font-bold text-[1.7rem] md:text-[2rem] lg:text-[2rem] "
              >
                Land your
                <span className="ml-2 border-b-4 border-blue-500">
                  dream job
                </span>{" "}
                with the help of our cv craft
              </h4>
            </div>
            <div className="block  md:flex md:gap-x-20 md:justify-center md:my-6 ">
              <div className="my-8 shadow-md p-2 shadow-slate-300 md:my-0 lg:my-0">
                <Image
                  src={ResumeImage}
                  alt="resumeForm"
                  width={600}
                  height={500}
                />
              </div>

              <div>
                <ul className="">
                  <li className="flex gap-x-3 items-center px-3 py-2 bg-slate-200 my-2">
                    <MdExtension color="grey" size={25} />
                    <h4 className="font-bold text-[1.2rem] md:text-[1.3rem] lg:text-[1.3rem]">
                      Intutive CV Builder
                    </h4>
                  </li>
                  <li className="flex gap-x-3 items-center px-3 py-2 hover:bg-slate-200 my-2 ">
                    <AiTwotoneMedicineBox color="grey" size={25} />
                    <h4 className="font-bold text-[1.2rem] md:text-[1.3rem] lg:text-[1.3rem]">
                      A Tailored CV
                    </h4>
                  </li>
                  <li className="flex gap-x-3 items-center px-3 py-2 hover:bg-slate-200 my-2 ">
                    <MdDownload color="grey" size={25} />
                    <h4 className="font-bold text-[1.2rem] md:text-[1.3rem] lg:text-[1.3rem]">
                      Free Download
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* ............................ */}
        <div>
          <div>
            <div>
              <h4 className="text-center font-bold text-[2rem]">
                Explore our CV Template
              </h4>
            </div>
            <div className="w-[70%] mx-auto my-8 ">
              <div>
                <Template />
              </div>
            </div>
          </div>
        </div>

        {/* ............................ */}
        <div className="my-16 mx-28 text-justify">
          <div>
            <div>
              <h4 className="text-current text-center font-bold text-[1.7rem] md:text-[2rem] lg:text-[2rem]">
                Why build{" "}
                <span className="border-b-4 border-blue-500">your cv</span> with
                our cv builder?
              </h4>
            </div>

            <div className="my-6">
              <div className=" block md:flex md:justify-around lg:flex lg:justify-around items-center">
                <div className="w-[80%] mx-auto my-4 md:w-[30%] lg:w-[20%]">
                  <div className="flex gap-x-3 ">
                    <MdFreeBreakfast color="blue" size={35} />
                    <h4 className="font-bold text-[1.2rem] my-4">
                      We re friendly free
                    </h4>
                  </div>
                  <p className="text-md font-medium text-lg">
                    No gimmicks, no freemium features, no joke. Get everything
                    you need to build a professional resume that shows off your
                    best qualities to help you land your next job.
                  </p>
                </div>
                <div className="w-[80%] mx-auto my-4 md:w-[30%] lg:w-[20%]">
                  <div className="flex gap-x-3">
                    <HiOutlineDuplicate color="blue" size={35} />
                    <h4 className="font-bold text-[1.2rem] my-4">
                      Data-Driven Templates
                    </h4>
                  </div>
                  <p className="text-md font-medium text-lg">
                    No gimmicks, no freemium features, no joke. Get everything
                    you need to build a professional resume that shows off your
                    best qualities to help you land your next job.
                  </p>
                </div>
                <div className="w-[80%] mx-auto my-4 md:w-[30%] lg:w-[20%]">
                  <div className="flex gap-x-3">
                    <BsBriefcase color="blue" size={35} />
                    <h4 className="font-bold text-[1.2rem] my-4">Get Notice</h4>
                  </div>
                  <p className="text-md font-medium text-lg">
                    No gimmicks, no freemium features, no joke. Get everything
                    you need to build a professional resume that shows off your
                    best qualities to help you land your next job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Mainlayout>
    </div>
  );
};
