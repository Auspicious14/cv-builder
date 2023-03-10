import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../library";
import { ICV } from "../../buildcv/model";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SkillList } from "../../skill/components/listitem";
import { AcademyList } from "../../academic/components/listitem";
import { ApButton, ApLoader, ApModal } from "../../../components";
import { UpdateCVModal } from "../../buildcv/update/modal";
import { useCvState } from "../../buildcv/context";
import { BlockTemplateExperienceListItem } from "./components/listitems";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { CertificateList } from "../../certificate/components/listitem";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Pdf from "react-to-pdf";
import { FiDownload } from "react-icons/fi";

export const BlockTemplate = () => {
  const ref = React.createRef<any>();
  const { getImageFile, imageFile } = useCvState();
  const [cvState, setCvState] = useState<ICV>({} as any);
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState({});
  const router = useRouter();
  const getCVDocument = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSession(user?.uid);
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
      <div>
        {session ? (
          <div>
            {loading ? (
              <div className="w-screen h-screen flex justify-center items-center">
                <ApLoader
                  // colors={["#808080", "#808080", "#FFFFFF", "#FFFFFF", "#808080"]}
                  color={"#808080"}
                />
              </div>
            ) : (
              <div>
                <div
                  ref={ref}
                  className="p-4 m-auto  lg:w-[70%] h-auto bg-gray-200"
                >
                  <div className="lg:w-full lg:flex lg:gap-8 lg:justify-between lg:items-center w-full shadow-md mb-2 py-4  border rounded-lg px-2 bg-white">
                    <div className="w-full flex gap-8 lg:justify-between items-center ">
                      <img
                        src={imageFile}
                        alt="name"
                        className="w-[5rem] border text-center lg:m-auto rounded-full"
                      />
                      <div className="">
                        <div className="mb-2 lg:flex text-xl uppercase font-bold">
                          <div>{`${cvState?.firstName} ${cvState?.lastName}`}</div>
                        </div>
                        <p className="hidden lg:block text-justify">
                          {cvState?.description}
                        </p>
                      </div>
                    </div>
                    <p className=" block lg:hidden text-justify">
                      {cvState?.description}
                    </p>
                  </div>

                  <div className=" lg:flex lg:justify-between h-auto">
                    <div className="lg:w-[50%] shadow-md">
                      <div className="h-full bg-white border rounded-lg p-4 px-2 mb-3 lg:mb-0">
                        <h1 className="uppercase font-bold pb-2 text-lg">
                          experience
                        </h1>
                        {cvState?.experience?.map((e, i) => (
                          <div className="border-b last:border-b-0" key={i}>
                            <BlockTemplateExperienceListItem
                              experience={e}
                              key={i}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-[45%] h-auto">
                      <div className="bg-white p-4 shadow-md border rounded-lg mb-3">
                        <p className="uppercase font-bold pb-2 text-lg">
                          contact
                        </p>
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
                      <div className="bg-white shadow-md border rounded-lg p-4 mb-3">
                        <h1 className="uppercase font-bold text-lg mb-2">
                          Skills
                        </h1>
                        <div className="">
                          {cvState?.skill?.map((s, i) => (
                            <SkillList skill={s} key={i} />
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4 shadow-md border rounded-lg mb-3">
                        <h1 className="font-bold text-lg uppercase mb-2">
                          Education
                        </h1>
                        <div className="my-4">
                          {cvState?.academy?.map((a, i) => (
                            <AcademyList academy={a} key={i} />
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4 shadow-md border rounded-lg">
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
                <div className="flex justify-center my-2 gap-4 mx-4 lg:mx-0">
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
                    name="Main Template"
                    type="button"
                    onClick={() => router.push("/cv")}
                    className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <ApButton
                    name="Edit"
                    type="button"
                    onClick={() => setModal({ show: true, data: cvState })}
                    className="bg-gray-400 mx-4 my-2 px-4 text-white border-none rounded-sm outline-none "
                  />
                  <Pdf targetRef={ref} filename="resume.pdf">
                    {({ toPdf }) => (
                      <ApButton
                        name={"Download Resume"}
                        type={"button"}
                        className={
                          "bg-black text-white px-4 py-2 border rounded-md"
                        }
                        onClick={toPdf}
                        icon={<FiDownload size={20} />}
                      />
                    )}
                  </Pdf>
                </div>
              </div>
            )}
            <ApModal
              title={"Update CV"}
              show={modal.show}
              onDimiss={() => setModal({ show: false })}
              containerClassName={"w-[70%] m-auto"}
              possition={"left-0"}
            >
              {modal.show && (
                <UpdateCVModal
                  update={cvState}
                  onDissmiss={() => setModal({ show: false })}
                />
              )}
            </ApModal>
          </div>
        ) : (
          <Link
            className="absolute top-[-50%] right-[-50%]"
            href={"/auth/signin"}
          >
            Please log in to view resume
          </Link>
        )}
      </div>
    </>
  );
};
