import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../library";
import { ExperienceList } from "../experience/components/listitem";
import { ICV } from "./model";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SkillList } from "../skill/components/listitem";
import { AcademyList } from "../academic/components/listitem";
import { ApButton, ApLoader, ApModal } from "../../components";
import { UpdateCVModal } from "./update/modal";
import { useCvState } from "./context";
import { CertificateList } from "../certificate/components/listitem";
import { useRouter } from "next/router";
import Image from "next/image";

export const BuildPage = () => {
  const { getImageFile, imageFile } = useCvState();
  const [cvState, setCvState] = useState<ICV>({} as any);
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const getCVDocument = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        const cvDocRef = doc(db, "cv", user.uid);
        const cvSnapShot = await getDoc(cvDocRef);
        if (cvSnapShot.exists()) {
          setLoading(false);
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
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <ApLoader color={"#5C5CFF"} />
        </div>
      ) : (
        <div>
          <div className=" m-auto my-2 border-[2rem] border-blue-500 w-[70%] h-auto">
            <div className=" flex p-4 gap-8">
              <Image
                src={imageFile}
                alt="name"
                className="w-[15%] h-[15%] border rounded-full"
              />
              <div className="pt-8 pb-4 text-4xl">
                {`${cvState?.firstName
                  ?.charAt(0)
                  ?.toLocaleUpperCase()}${cvState?.firstName?.slice(
                  1
                )} ${cvState?.lastName
                  ?.charAt(0)
                  ?.toLocaleUpperCase()}${cvState?.lastName?.slice(1)}`}
              </div>
            </div>
            <p className="p-4 text-justify">{cvState?.description}</p>
            <div className="ml-4 flex text-white justify-between  h-auto p-4 bg-blue-500">
              <div>
                <p>{cvState?.email}</p>
                <p>{cvState?.phoneNumber}</p>
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
                <h1 className="font-bold text-lg">Certification</h1>
                <div className="my-4">
                  {cvState?.certificate?.map((c, i) => (
                    <CertificateList certificate={c} key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <ApButton
              name="Blend Template"
              type="button"
              onClick={() => router.push("/template/blend")}
              className="bg-red-900 px-4 py-2 text-white border-none rounded-md outline-none "
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
        </div>
      )}
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
