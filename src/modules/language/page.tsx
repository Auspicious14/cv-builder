import React, { useState } from "react";

import { LanguageDetail } from "./detail";
import { ILanguage } from "./model";

export const LanguagePage = () => {
  const [language, setlanguage] = useState<ILanguage>();
  return (
    <>
      <div>
        <LanguageDetail language={language as any} />
      </div>
    </>
  );
};
