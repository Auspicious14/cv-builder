import React from "react";
import { AcademyContextProvider } from "../modules/academic/context";
import { AcademyPage } from "../modules/academic/page";

const Academy = () => {
  return (
    <div>
      <AcademyContextProvider>
        <AcademyPage />
      </AcademyContextProvider>
    </div>
  );
};

export default Academy;
