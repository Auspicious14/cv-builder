import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../library";
import { ICV } from "./model";

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

      {cvState && (
        <div className=" m-auto my-2 border-8 border-blue-700 w-[80%] h-auto">
          <div className="pt-8 pb-4 text-4xl">
            {`${cvState?.firstName
              .charAt(0)
              .toLocaleUpperCase()}${cvState.firstName.slice(
              1
            )} ${cvState?.lastName
              .charAt(0)
              .toLocaleUpperCase()}${cvState.lastName.slice(1)}`}
          </div>
          <div className="flex justify-between w-full h-auto p-4">
            <div>
              <p>{cvState.email}</p>
              <p>{cvState.phoneNumber}</p>
            </div>
            <div>{cvState.address}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold">Work History</h1>
              <p>{`From ${cvState.createdAt} to ${cvState.graduatedAt}`}</p>
              <p>{"Software Engineering"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
