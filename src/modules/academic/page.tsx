import React, { useState } from "react";
import { AcademyDetail } from "./detail";
import { IAcademy } from "./model";

export const AcademyPage = () => {
  const [academy, setAcademy] = useState<IAcademy>();
  return (
    <>
      <AcademyDetail academy={academy as any} />
    </>
  );
};
