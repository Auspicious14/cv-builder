import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../library";
import { useCvState } from "./context";
import { ICV } from "./model";

export const BuildPage = () => {
  const [cvState, setCvState] = useState<ICV>();
  const getCVDocument = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cvDocRef = doc(db, "cv", user.uid);
        const cvSnapShot = await getDoc(cvDocRef);
        if (cvSnapShot.exists()) {
          console.log(cvSnapShot.data(), "cv dataaaaaa");
          setCvState(cvSnapShot.data() as any);
          // console.log(cvState?.personalInfo?.firstName);
        }
      }
    });
  };
  // console.log(cvState);
  useEffect(() => {
    getCVDocument();
  }, []);
  return (
    <>
      {cvState && (
        <div>
          <div className="text-center w-full h-40 bg-cyan-400 border rounded-sm">
            <h1>Personal Info</h1>
            <div>
              <div>{cvState?.firstName}</div>
              <div>{cvState?.lastName}</div>
              <div>{cvState?.email}</div>
              <div>{cvState?.phoneNumber}</div>
              <div>{cvState?.city}</div>
            </div>
          </div>
          <div className="text-center w-full h-40 bg-blue-400 border rounded-sm">
            <h1>Skills</h1>
            <div>
              <div>{cvState?.skill1}</div>
              <div>{cvState?.skill2}</div>
              <div>{cvState?.skill3}</div>
              <div>{cvState?.skill4}</div>
              <div>{cvState?.skill5}</div>
            </div>
          </div>
          <div className="text-center w-full h-40 bg-green-300 border rounded-sm">
            <h1>Academy</h1>
            <div>
              <div>{cvState?.secondarySchool}</div>
              <div>{cvState?.university}</div>
              <div>{cvState?.stateofSchool}</div>
              <div>{`From: ${cvState?.createdAt}`}</div>
              <div>{`To: ${cvState?.graduatedAt}`}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
