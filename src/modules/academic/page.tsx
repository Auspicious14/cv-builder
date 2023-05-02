import React, { useState } from "react";
import { AcademyDetail } from "./detail";
import { IAcademy } from "./model";

export const AcademyPage = () => {
  const [academic, setAcademic] = useState<IAcademy>();
  return (
    <>
      <AcademyDetail academic={academic as any} />
    </>
  );
};
