import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../library";
import { ExperienceList } from "../experience/components/listitem";
import { ICV } from "./model";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SkillList } from "../skill/components/listitem";
import { AcademyList } from "../academic/components/listitem";

export const BuildPage = () => {
  const [cvState, setCvState] = useState<ICV>();

  const getCVDocument = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cvDocRef = doc(db, "cv", user.uid);
        const cvSnapShot = await getDoc(cvDocRef);
        if (cvSnapShot.exists()) {
          setCvState(cvSnapShot.data() as any);
        }
      }
    });
  };
  console.log(cvState?.academy);
  useEffect(() => {
    getCVDocument();
  }, []);

  return (
    <>
      {cvState && (
        <div className=" m-auto my-2 border-[2rem] border-blue-700 w-[80%] h-auto">
          <div className="p-4">
            <div className="pt-8 pb-4 text-4xl">
              {`${cvState?.firstName
                .charAt(0)
                .toLocaleUpperCase()}${cvState.firstName.slice(
                1
              )} ${cvState?.lastName
                .charAt(0)
                .toLocaleUpperCase()}${cvState.lastName.slice(1)}`}
            </div>
            <p className="text-justify">{cvState?.description}</p>
          </div>
          <div className="ml-4 flex text-white justify-between  h-auto p-4 bg-blue-500">
            <div>
              <p>{cvState.email}</p>
              <p>{cvState.phoneNumber}</p>
            </div>
            <div className="flex  items-center">
              <HiOutlineLocationMarker size={20} />
              <p>{cvState?.address}</p>
            </div>
          </div>
          <div className="w-full flex gap-4 justify-between p-4">
            <div className="w-[50%]">
              <h1 className="font-bold text-lg">Work History</h1>
              <div>
                {cvState?.experience?.map((e, i) => (
                  <ExperienceList experience={e} key={i} />
                ))}
              </div>
            </div>
            <div className="w-[50%] pl-12">
              <h1 className="font-bold text-lg">Skills</h1>
              <div className="my-4">
                {cvState?.skill?.map((s, i) => (
                  <SkillList skill={s} key={i} />
                ))}
              </div>
              <h1 className="font-bold text-lg">Education</h1>
              <div className="my-4">
                {cvState?.academy?.map((a, i) => (
                  <AcademyList academy={a} key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
