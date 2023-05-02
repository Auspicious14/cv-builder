import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ExperienceList } from "../experience/components/listitem";
import { SkillList } from "../skill/components/listitem";
import { AcademyList } from "../academic/components/listitem";
import { ApButton, ApLoader, ApModal } from "../../components";
import { UpdateCVModal } from "../buildcv/update/modal";
import { useCvState } from "../buildcv/context";
import { CertificateList } from "../certificate/components/listitem";
import { useRouter } from "next/router";
import Link from "next/link";
import Pdf from "react-to-pdf";
import { FiDownload } from "react-icons/fi";
import { getCookie } from "../../services/helper";

export const BlendTemplate = () => {
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
            {loading && (
              <div className="w-[100vw] h-[100vh] m-auto flex justify-center items-center">
                <ApLoader color="#800000" />
              </div>
            )}

            {!loading && cvState === null ? (
              ""
            ) : (
              <div>
                <div ref={ref} className="m-auto flex lg:w-[70%] h-auto">
                  <div className="lg:w-[40%] w-[30%] px-2 pt-4 lg:pt-0 bg-blend-darken bg-red-900 text-white">
                    {cvState?.personalInformation?.image && (
                      <div className="relative">
                        <img
                          src={cvState?.personalInformation?.image?.uri}
                          alt={cvState?.personalInformation?.image?.name}
                          className=" border w-[5rem] h-[5rem] rounded-full text-center m-auto lg:rounded-full"
                        />
                      </div>
                    )}
                    <div className="pt-8 pb-4 text-2xl uppercase font-bold">
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
                    <p className="">
                      {cvState?.personalInformation?.profession}
                    </p>

                    <div>
                      <p className="py-2">
                        {cvState?.personalInformation?.email}
                      </p>
                      <p className="py-2">
                        {cvState?.personalInformation?.phoneNumber}
                      </p>
                      <div className="">
                        {/* <HiOutlineLocationMarker size={20} /> */}
                        <p className="">
                          {cvState?.personalInformation?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-gray-200 h-auto pt-4 lg:pt-0">
                    {cvState?.personalInformation?.description ? (
                      <div>
                        {" "}
                        <p className="mx-4 font-bold text-xl border border-b-gray-300">
                          DESCRIPTION
                        </p>
                        <p className="p-2 px-4 text-justify">
                          {cvState?.personalInformation?.description}
                        </p>
                      </div>
                    ) : null}
                    <div className="w-full  p-4">
                      {cvState?.experience ? (
                        <div className="">
                          <h1 className="uppercase font-bold mb-2 text-xl border border-b-gray-300">
                            Work History
                          </h1>
                          <div>
                            {cvState?.experience?.map((e, i) => (
                              <ExperienceList experience={e} key={i} />
                            ))}
                          </div>
                        </div>
                      ) : null}
                      <div>
                        {cvState?.skill ? (
                          <div>
                            <h1 className="uppercase font-bold text-xl border border-b-gray-300 mb-2">
                              Skills
                            </h1>
                            <div className="my-2">
                              {cvState?.skill?.map((s, i) => (
                                <SkillList skill={s} key={i} />
                              ))}
                            </div>
                          </div>
                        ) : null}
                        {cvState?.academic ? (
                          <div>
                            <h1 className="font-bold text-xl uppercase border border-b-gray-300 mb-2">
                              Education
                            </h1>
                            <div className="my-4">
                              {cvState?.academic?.map((a, i) => (
                                <AcademyList academy={a} key={i} />
                              ))}
                            </div>
                          </div>
                        ) : null}
                        {cvState?.certificate ? (
                          <div>
                            <h1 className="font-bold text-lg uppercase border border-b-gray-300 mb-2">
                              Certification
                            </h1>
                            <div className="my-4">
                              {cvState?.certificate?.map((c, i) => (
                                <CertificateList certificate={c} key={i} />
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center my-2 mx-4 lg:mx-0 gap-4">
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
                <div className="flex gap-4 justify-center">
                  <ApButton
                    name="Edit"
                    type="button"
                    onClick={() => setModal({ show: true, data: cvState })}
                    className="bg-red-900 px-4 py-2 mx-4 text-white border-none rounded-md outline-none "
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
            Please sign in to view resume
          </Link>
        )}
      </div>
    </>
  );
};
