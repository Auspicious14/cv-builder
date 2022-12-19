import { useRouter } from "next/router";
import React from "react";
import { ApButton, ApTextInput } from "../../components";

export const SkillPage = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <ApTextInput type="text" name="skill1" placeHolder="" />
        <ApTextInput type="text" name="skill2" placeHolder="" />
        <ApTextInput type="text" name="skill3" placeHolder="" />
        <ApTextInput type="text" name="skill4" placeHolder="" />
        <ApTextInput type="text" name="skill5" placeHolder="" />
        <ApButton
          name="Next --->"
          type="button"
          onClick={() => router.push("/build")}
        />
      </div>
    </>
  );
};
