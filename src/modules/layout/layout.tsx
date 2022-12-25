import React from "react";
import { Footer } from "./footer";
import { Navbar } from "./nav";

interface IProps {
  children: React.ReactNode;
}
export const Mainlayout: React.FC<IProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
