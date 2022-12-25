import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../library";
import { ICV } from "../../buildcv/model";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SkillList } from "../../skill/components/listitem";
import { AcademyList } from "../../academic/components/listitem";
import { ApButton, ApModal } from "../../../components";
import { UpdateCVModal } from "../../buildcv/update/modal";
import { useCvState } from "../../buildcv/context";
import { BlockTemplateExperienceListItem } from "./components/listitems";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { CertificateList } from "../../certificate/components/listitem";

export const BlockTemplate = () => {
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
        <div className="p-4 m-auto  w-[70%] h-auto bg-gray-200">
          <div className="w-full flex gap-8 mb-2 py-4 justify-between items-center border rounded-md px-2 bg-white">
            <img
              src={imageFile}
              alt="name"
              className="w-[5rem] border text-center m-auto rounded-full"
            />
            <div className="">
              <div className="mb-2 flex text-xl uppercase font-bold">
                <div>{`${cvState?.firstName} ${cvState?.lastName}`}</div>
              </div>
              <p className=" text-justify">{cvState?.description}</p>
            </div>
          </div>
          <div className=" flex justify-between h-auto">
            <div className="w-[50%]">
              <div className="bg-white border rounded-md p-4 px-2">
                <h1 className="uppercase font-bold pb-2 text-lg">experience</h1>
                {cvState?.experience?.map((e, i) => (
                  <div className="border-b last:border-b-0">
                    <BlockTemplateExperienceListItem experience={e} key={i} />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[45%] h-auto">
              <div className="bg-white p-4 border rounded-md mb-3">
                <p className="uppercase font-bold pb-2 text-lg">contact</p>
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
              <div className="bg-white border rounded-md p-4 mb-3">
                <h1 className="uppercase font-bold text-lg mb-2">Skills</h1>
                <div className="">
                  {cvState?.skill?.map((s, i) => (
                    <SkillList skill={s} key={i} />
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 border rounded-md mb-3">
                <h1 className="font-bold text-lg uppercase mb-2">Education</h1>
                <div className="my-4">
                  {cvState?.academy?.map((a, i) => (
                    <AcademyList academy={a} key={i} />
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 border rounded-md">
                <h1 className="font-bold text-lg uppercase mb-2">
                  Certification
                </h1>
                <div className="my-4">
                  {cvState?.certificate?.map((c, i) => (
                    <CertificateList certificate={c} key={i} />
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
