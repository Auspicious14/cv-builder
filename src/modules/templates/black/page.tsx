import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../library";
import { ExperienceList } from "../../experience/components/listitem";
import { ICV } from "../../buildcv/model";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SkillList } from "../../skill/components/listitem";
import { AcademyList } from "../../academic/components/listitem";
import { ApButton, ApModal } from "../../../components";
import { UpdateCVModal } from "../../buildcv/update/modal";
import { getDownloadURL } from "firebase/storage";
import { useCvState } from "../../buildcv/context";
import { BlackTemplateExperienceListItem } from "./components/listitems";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

export const BlackTemplate = () => {
  const { getImageFile, imageFile } = useCvState();
  const [cvState, setCvState] = useState<ICV>({} as any);
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });

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
    getImageFile();
  }, []);

  return (
    <>
      {cvState && (
        <div className="px-6 text-white m-auto w-[80%] h-auto bg-neutral-800">
          <div className="flex gap-8 mb-12 pt-8 justify-between items-center w-[50%] px-2 text-white">
            {/* <img
              src={imageFile}
              alt="name"
              className=" border text-center m-auto rounded-full"
            /> */}
            <div className=" text-2xl uppercase font-bold">
              <div>
                {`${cvState?.firstName
                  ?.charAt(0)
                  ?.toLocaleUpperCase()}${cvState?.firstName?.slice(1)}`}
              </div>
              <div>{cvState?.lastName}</div>
            </div>
            <div className="bg-white w-[1px] h-28"></div>
            <div>
              <div className="py-2 flex gap-2 items-center">
                <MdOutlineMarkEmailUnread size={20} />
                <p>{cvState?.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                <BsFillTelephoneFill size={20} />
                <p>{cvState?.phoneNumber}</p>
              </div>
              <div className="py-2 flex gap-2 items-center">
                <HiOutlineLocationMarker size={20} />
                <p>{cvState?.address}</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-between h-auto">
            <div className="w-[40%]">
              <div className="mb-8">
                <p className=" font-bold text-lg uppercase pb-2">profile</p>
                <p className=" text-justify">{cvState?.description}</p>
              </div>
              <div className="mb-8">
                <h1 className="uppercase font-bold pb-2 text-lg">
                  Work experience
                </h1>
                <div>
                  {cvState?.experience?.map((e, i) => (
                    <BlackTemplateExperienceListItem experience={e} key={i} />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[40%] ">
              <div className="mb-8">
                <h1 className="uppercase font-bold text-lg mb-2">Skills</h1>
                <div className="">
                  {cvState?.skill?.map((s, i) => (
                    <SkillList skill={s} key={i} />
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h1 className="font-bold text-lg uppercase mb-2">Education</h1>
                <div className="my-4">
                  {cvState?.academy?.map((a, i) => (
                    <AcademyList academy={a} key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ApButton
        name="Edit"
        type="button"
        onClick={() => setModal({ show: true, data: cvState })}
        className="bg-neutral-800 mx-4 my-2 px-4 text-white border-none rounded-sm outline-none "
      />
      <ApModal
        title={"Update CV"}
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
        containerClassName={"w-[70%] m-auto"}
      >
        {modal.show && (
          <UpdateCVModal
            update={cvState}
            onDissmiss={() => setModal({ show: false })}
          />
        )}
      </ApModal>
    </>
  );
};