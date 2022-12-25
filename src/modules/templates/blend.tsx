import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../library";
import { ExperienceList } from "../experience/components/listitem";
import { ICV } from "../buildcv/model";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SkillList } from "../skill/components/listitem";
import { AcademyList } from "../academic/components/listitem";
import { ApButton, ApModal } from "../../components";
import { UpdateCVModal } from "../buildcv/update/modal";
import { getDownloadURL } from "firebase/storage";
import { useCvState } from "../buildcv/context";
import { CertificateList } from "../certificate/components/listitem";
import { useRouter } from "next/router";

export const BlendTemplate = () => {
  const { getImageFile, imageFile } = useCvState();
  const [cvState, setCvState] = useState<ICV>({} as any);
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });
  const router = useRouter();
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
        <div className="m-auto flex w-[70%] h-auto">
          <div className="w-[40%] px-2 bg-blend-darken bg-red-900 text-white">
            <img
              src={imageFile}
              alt="name"
              className=" border text-center m-auto rounded-full"
            />
            <div className="pt-8 pb-4 text-2xl uppercase font-bold">
              {`${cvState?.firstName
                ?.charAt(0)
                ?.toLocaleUpperCase()}${cvState?.firstName?.slice(
                1
              )} ${cvState?.lastName
                ?.charAt(0)
                ?.toLocaleUpperCase()}${cvState?.lastName?.slice(1)}`}
            </div>
            <p className="">{cvState?.profession}</p>

            <div>
              <p className="py-2">{cvState?.email}</p>
              <p className="py-2">{cvState?.phoneNumber}</p>
              <div className="">
                {/* <HiOutlineLocationMarker size={20} /> */}
                <p className="">{cvState?.address}</p>
              </div>
            </div>
          </div>
          <div className=" bg-gray-200 h-auto">
            <p className="mx-4 font-bold text-lg border border-b-gray-300">
              DESCRIPTION
            </p>
            <p className="p-2 px-4 text-justify">{cvState?.description}</p>
            <div className="w-full  p-4">
              <div className="">
                <h1 className="uppercase font-bold mb-2 text-lg border border-b-gray-300">
                  Work History
                </h1>
                <div>
                  {cvState?.experience?.map((e, i) => (
                    <ExperienceList experience={e} key={i} />
                  ))}
                </div>
              </div>
              <div className=" ">
                <h1 className="uppercase font-bold text-lg border border-b-gray-300 mb-2">
                  Skills
                </h1>
                <div className="my-2">
                  {cvState?.skill?.map((s, i) => (
                    <SkillList skill={s} key={i} />
                  ))}
                </div>
                <h1 className="font-bold text-lg uppercase border border-b-gray-300 mb-2">
                  Education
                </h1>
                <div className="my-4">
                  {cvState?.academy?.map((a, i) => (
                    <AcademyList academy={a} key={i} />
                  ))}
                </div>
                <h1 className="font-bold text-lg uppercase border border-b-gray-300 mb-2">
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
      <div className="flex justify-center my-2 gap-4">
        <ApButton
          name="Main Template"
          type="button"
          onClick={() => router.push("/cv")}
          className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
        />
        <ApButton
          name="Black Template"
          type="button"
          onClick={() => router.push("/template/black")}
          className="bg-black px-4 py-2 text-white border-none rounded-md outline-none "
        />
        <ApButton
          name="Block Template"
          type="button"
          onClick={() => router.push("/template/block")}
          className="bg-gray-400 px-4 py-2 text-white border-none rounded-md outline-none "
        />
      </div>
      <ApButton
        name="Edit"
        type="button"
        onClick={() => setModal({ show: true, data: cvState })}
        className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
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
