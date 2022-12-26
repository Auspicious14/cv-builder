import React from "react";
import { AcademyContextProvider } from "../modules/academic/context";
import { AcademyPage } from "../modules/academic/page";
import { ApMainLayOut } from "../modules/layout/mainlayout";

const Academy = () => {
  return (
    <div>
      <AcademyContextProvider>
        <ApMainLayOut>
          <AcademyPage />
        </ApMainLayOut>
      </AcademyContextProvider>
    </div>
  );
};

export default Academy;
