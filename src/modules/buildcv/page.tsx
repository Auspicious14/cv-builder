import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
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
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";
import Pdf from "react-to-pdf";
import { getCookie } from "../../services/helper";
import Image from "next/image";

export const BuildPage = () => {
  const ref = React.createRef<any>();
  const { getCVDocument, loading, cvState } = useCvState();
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });
  const router = useRouter();

  const id = getCookie("user_id");
  useEffect(() => {
    getCVDocument(id);
  }, []);

  return (
    <>
      <div>
        {id ? (
          <div>
            {loading && (
              <div className="w-screen h-screen flex justify-center items-center">
                <ApLoader color={"#5C5CFF"} />
              </div>
            )}

            {!loading && cvState ? (
              <div>
                <>
                  <div
                    ref={ref}
                    className=" m-auto my-2 lg:border-[2rem] border-blue-500 lg:w-[58%] h-auto"
                  >
                    <div className=" flex p-4 gap-8 items-center">
                      {cvState?.personalInformation?.image && (
                        <img
                          src={
                            cvState?.personalInformation?.image?.uri
                              ? cvState?.personalInformation?.image?.uri
                              : "https://picsum.photos/200/300"
                          }
                          alt={cvState?.personalInformation?.image?.name}
                          className="w-[15%] h-[15%] border rounded-full"
                          width={200}
                          height={200}
                        />
                      )}
                      <div className="lg:pt-8 lg:pb-4 lg:text-4xl text-2xl font-bold">
                        {`${cvState?.personalInformation?.firstName
                          ?.charAt(0)
                          ?.toLocaleUpperCase()}${cvState?.personalInformation?.firstName?.slice(
                          1
                        )} ${cvState?.personalInformation?.lastName
                          ?.charAt(0)
                          ?.toLocaleUpperCase()}${cvState?.personalInformation?.lastName?.slice(
                          1
                        )}`}
                      </div>
                    </div>
                    <p className="p-4 text-justify">
                      {cvState?.personalInformation?.description}
                    </p>
                    <div className="ml-4 lg:flex text-white lg:justify-between  h-auto lg:p-4 p-2 bg-blue-500">
                      <div>
                        <div className="py-2 flex gap-2 items-center">
                          <MdOutlineMarkEmailUnread size={20} />
                          <p>{cvState?.personalInformation?.email}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <BsFillTelephoneFill size={20} />
                          <p>{cvState?.personalInformation?.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <HiOutlineLocationMarker size={20} />
                        <p>{cvState?.personalInformation?.address}</p>
                      </div>
                    </div>
                    <div className="w-full lg:flex lg:gap-4 lg:justify-between p-4">
                      <div className="lg:w-[50%]">
                        <h1 className="font-bold text-lg">Work History</h1>
                        <div>
                          {cvState?.experience?.map((e, i) => (
                            <ExperienceList experience={e} key={i} />
                          ))}
                        </div>
                      </div>
                      <div className="lg:w-[50%] lg:pl-12">
                        <h1 className="font-bold text-lg">Skills</h1>
                        <div className="lg:my-4 my-2">
                          {cvState?.skill?.map((s, i) => (
                            <SkillList skill={s} key={i} />
                          ))}
                        </div>
                        <h1 className="font-bold text-lg">Education</h1>
                        <div className="lg:my-4 my-2">
                          {cvState?.academic?.map((a, i) => (
                            <AcademyList academy={a} key={i} />
                          ))}
                        </div>
                        <h1 className="font-bold text-lg">Certification</h1>
                        <div className="lg:my-4 my-2">
                          {cvState?.certificate?.map((c, i) => (
                            <CertificateList certificate={c} key={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>

                <div className="flex justify-center lg:gap-4 gap-2 mx-4 mb-2 lg:mb-0 lg:mx-0">
                  <ApButton
                    name="Blend Template"
                    type="button"
                    onClick={() => router.push("/template/blend")}
                    className="bg-red-900 lg:px-4 py-2 px-2 text-white border-none rounded-md outline-none "
                  />
                  <ApButton
                    name="Black Template"
                    type="button"
                    onClick={() => router.push("/template/black")}
                    className="bg-black lg:px-4 py-2 px-2 text-white border-none rounded-md outline-none "
                  />
                  <ApButton
                    name="Block Template"
                    type="button"
                    onClick={() => router.push("/template/block")}
                    className="bg-gray-400 lg:px-4 py-2 px-2 text-white border-none rounded-md outline-none "
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <ApButton
                    name="Edit"
                    type="button"
                    onClick={() => setModal({ show: true, data: cvState })}
                    className="bg-blue-400 lg:px-4 py-2 px-4 mx-4 mb-4 lg:mb-0 lg:mx-0 text-white border-none rounded-md outline-none "
                  />
                  <Pdf targetRef={ref} filename="resume.pdf">
                    {({ toPdf }: any) => (
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
            ) : (
              <div>nothing is here</div>
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
          </div>
        ) : (
          <Link
            className="absolute top-[-50%] right-[-50%]"
            href={"/auth/signin"}
          >
            Please log in to get your resume
          </Link>
        )}
      </div>
    </>
  );
};
