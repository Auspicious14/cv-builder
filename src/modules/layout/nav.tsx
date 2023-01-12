import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineMenuUnfold } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { auth } from "../../library";

export const Navbar = () => {
  const [toggle, setToggle] = useState<{ show: boolean; data?: any }>({
    show: false,
  });

  return (
    <div className="bg-black">
      <div
        className=" w-[100%] flex justify-between  items-center py-4 px-1
       sm:w-[100%] sm:flex sm:justify-between sm:items-center sm:py-4 sm:px-2
        md:flex md:justify-between md:items-center md:py-4 md:px-2 md:w-[75%] md:mx-auto"
      >
        <div>
          <h4 className="font-bold text-lg text-white px-4">Cv-Craft</h4>
        </div>
        <div className="hidden  sm:hidden md:hidden lg:flex">
          <nav className="">
            <ul className=" flex gap-x-4 font-bold text-sm text-white">
              <li className="flex gap-x-1">
                <Link href="/">Resumes</Link>
                <RiArrowDropDownLine color="color" size={20} />
              </li>
              <li className="flex gap-x-1">
                <Link href="/">Cover Letter</Link>
                <RiArrowDropDownLine color="color" size={20} />
              </li>
              <li className="flex gap-x-1">
                <Link href="/">Career Blog</Link>
                <RiArrowDropDownLine color="color" size={20} />
              </li>
              <li className="flex gap-x-1">
                <Link href="/">About</Link>
                <RiArrowDropDownLine color="color" size={20} />
              </li>
              <li className="flex gap-x-1">
                <Link href="/">Contact Us</Link>
                <RiArrowDropDownLine color="color" size={20} />
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden sm:hidden md:hidden lg:flex">
          <div className="flex  gap-x-3 items-center ">
            <div>
              <Link href={"/auth/signin"}>
                <button className="text-white">Login</button>
              </Link>
            </div>
            <div>
              <Link href={"/personalInfo"}>
                <button className=" bg-blue-700 rounded-md uppercase text-white p-1 px-3 font-bold ">
                  get started
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:flex md:flex lg:hidden">
          <AiOutlineMenuUnfold
            color="white"
            size={30}
            onClick={() => setToggle({ show: true })}
          />
          {toggle.show && (
            <div>
              <NavList
                closeFunc={() => setToggle({ show: false })}
                open={toggle.show}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface IProps {
  closeFunc: () => void;
  open: boolean;
}
const NavList: React.FC<IProps> = ({ closeFunc, open }) => {
  // console.log(toggle, "true....")
  let [session, setSession] = useState() as any;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSession(user.uid);
      console.log(user.displayName);
    }
  });

  // console.log(session);
  return (
    <div className="">
      <nav
        className={
          open
            ? "bg-white absolute right-[0] left-[0] top-[0] z-10 px-4 py-[2rem] transition delay-150 ease-in duration-300"
            : "bg-white absolute right-[0] left-[0] top-[-22rem] z-10 px-4 py-[2rem] transition ease-in duration-300"
        }
      >
        <div className="absolute right-[0] top-[2px] px-3 py-2">
          <AiOutlineCloseCircle color="black" size={30} onClick={closeFunc} />
        </div>
        <ul className="grid gap-y-4 grid-cols font-bold text-sm text-slate-700 mt-4">
          {session && (
            <li className="flex justify-between">
              <Link href="/cv">Resumes</Link>
              <RiArrowDropDownLine color="color" size={20} />
            </li>
          )}
          <li className="flex justify-between">
            <Link href="/">Cover Letter</Link>
            <RiArrowDropDownLine color="color" size={20} />
          </li>
          <li className="flex justify-between">
            <Link href="/">Career Blog</Link>
            <RiArrowDropDownLine color="color" size={20} />
          </li>
          <li className="flex justify-between">
            <Link href="/">About</Link>
            <RiArrowDropDownLine color="color" size={20} />
          </li>
          <li className="flex justify-between">
            <Link href="/">Contact Us</Link>
            <RiArrowDropDownLine color="color" size={20} />
          </li>

          <li className="flex justify-between">
            <button>
              <Link href={"/auth/signin"}>Login</Link>
            </button>
          </li>
          <li className="flex justify-between">
            <button className=" bg-blue-700 rounded-md  text-white p-1 px-3 font-bold ">
              <Link href={"/personalInfo"}>BUILD MY RESUME</Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
