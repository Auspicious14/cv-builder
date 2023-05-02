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
import { BlackTemplateExperienceListItem } from "./components/listitems";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { CertificateList } from "../../certificate/components/listitem";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import Pdf from "react-to-pdf";
import { getCookie } from "../../../services/helper";
export const BlackTemplate = () => {
  const ref = React.createRef<any>();
  const { getImageFile, getCVDocument, loading, cvState } = useCvState();
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });
  const router = useRouter();

  const id = getCookie("user_id");

  useEffect(() => {
    getCVDocument(id);
    getImageFile();
  }, []);

  return (
    <>
      <div>
        {id ? (
          <div>
            {loading ? (
              <div className="w-screen h-screen flex justify-center items-center">
                <ApLoader color={"#000000"} />
              </div>
            ) : (
              <div className="bg-neutral-800 lg:bg-transparent">
                <div
                  ref={ref}
                  className="px-6 text-white m-auto lg:w-[70%] h-auto bg-neutral-800"
                >
                  <div className="lg:flex lg:gap-8 mb-12 pt-8 lg:justify-between lg:items-center lg:w-[50%] px-2 text-white">
                    <div className="text-center text-xl lg:text-2xl uppercase font-bold">
                      <div className="lg:block flex gap-2 items-center text-center justify-center">
                        <div>
                          {`${cvState?.personalInformation?.firstName
                            ?.charAt(0)
                            ?.toLocaleUpperCase()}${cvState?.personalInformation?.firstName?.slice(
                            1
                          )}`}
                        </div>
                        <div>{cvState?.personalInformation?.lastName}</div>
                      </div>
                      <p className="text-sm font-normal lg:py-2 normal-case">
                        {cvState?.personalInformation?.profession}
                      </p>
                    </div>
                    <div className="lg:block hidden">
                      <div className="bg-white z-50 w-[2px] h-28"></div>
                    </div>
                    <div className="pt-4 ">
                      <div className="py-2 flex gap-2 items-center">
                        <MdOutlineMarkEmailUnread size={20} />
                        <p>{cvState?.personalInformation?.email}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <BsFillTelephoneFill size={20} />
                        <p>{cvState?.personalInformation?.phoneNumber}</p>
                      </div>
                      <div className="py-2 flex gap-2 items-center">
                        <HiOutlineLocationMarker size={20} />
                        <p>{cvState?.personalInformation?.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" lg:flex lg:justify-between h-auto">
                    <div className="lg:w-[40%]">
                      <div className="mb-8">
                        <p className=" font-bold text-lg uppercase pb-2">
                          profile
                        </p>
                        <p className=" text-justify">
                          {cvState?.personalInformation?.description}
                        </p>
                      </div>
                      <div className="mb-8">
                        <h1 className="uppercase font-bold lg:pb-2 text-lg">
                          Work experience
                        </h1>
                        <div>
                          {cvState?.experience?.map((e, i) => (
                            <BlackTemplateExperienceListItem
                              experience={e}
                              key={i}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[40%] ">
                      <div className="mb-8">
                        <h1 className="uppercase font-bold text-lg mb-2">
                          Skills
                        </h1>
                        <div className="">
                          {cvState?.skill?.map((s, i) => (
                            <SkillList skill={s} key={i} />
                          ))}
                        </div>
                      </div>
                      <div className="mb-8">
                        <h1 className="font-bold text-lg uppercase mb-2">
                          Education
                        </h1>
                        <div className="my-4">
                          {cvState?.academic?.map((a, i) => (
                            <AcademyList academy={a} key={i} />
                          ))}
                        </div>
                      </div>
                      <div className="mb-8">
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
                    name="Main Template"
                    type="button"
                    onClick={() => router.push("/cv")}
                    className="bg-blue-400 px-4 py-2 text-white border-none rounded-md outline-none "
                  />
                  <ApButton
                    name="Block Template"
                    type="button"
                    onClick={() => router.push("/template/block")}
                    className="bg-gray-400 px-4 py-2 text-white border-none rounded-md outline-none "
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <ApButton
                    name="Edit"
                    type="button"
                    onClick={() => setModal({ show: true, data: cvState })}
                    className="bg-neutral-800 mx-4 my-2 px-4 text-white border-none rounded-sm outline-none "
                  />
                  <Pdf targetRef={ref} filename="resume.pdf">
                    {({ toPdf }: any) => (
                      <ApButton
                        name={"Download Resume"}
                        type={"button"}
                        className={
                          "bg-black text-white px-4 py-2 border rounded-md border-none"
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
            href={"auth/signin"}
          >
            Please log in to view resume
          </Link>
        )}
      </div>
    </>
  );
};
