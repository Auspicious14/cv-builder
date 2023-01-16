import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../library";
import { ExperienceList } from "../experience/components/listitem";
import { ICV } from "../buildcv/model";
import { SkillList } from "../skill/components/listitem";
import { AcademyList } from "../academic/components/listitem";
import { ApButton, ApLoader, ApModal } from "../../components";
import { UpdateCVModal } from "../buildcv/update/modal";
import { useCvState } from "../buildcv/context";
import { CertificateList } from "../certificate/components/listitem";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export const BlendTemplate = () => {
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
            {loading && (
              <div className="w-[100vw] h-[100vh] m-auto flex justify-center items-center">
                <ApLoader color="#800000" />
              </div>
            )}

            {!loading && cvState === null ? (
              ""
            ) : (
              <div>
                <div className="m-auto flex lg:w-[70%] h-auto">
                  <div className="lg:w-[40%] w-[30%] px-2 pt-4 lg:pt-0 bg-blend-darken bg-red-900 text-white">
                    <div className="relative">
                      <img
                        src={imageFile}
                        alt="name"
                        className=" border w-[5rem] h-[5rem] rounded-full text-center m-auto lg:rounded-full"
                      />
                    </div>
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
                  <div className=" bg-gray-200 h-auto pt-4 lg:pt-0">
                    {cvState.description ? (
                      <div>
                        {" "}
                        <p className="mx-4 font-bold text-xl border border-b-gray-300">
                          DESCRIPTION
                        </p>
                        <p className="p-2 px-4 text-justify">
                          {cvState?.description}
                        </p>
                      </div>
                    ) : null}
                    <div className="w-full  p-4">
                      {cvState.experience ? (
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
                        {cvState.skill ? (
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
                        {cvState.academy ? (
                          <div>
                            <h1 className="font-bold text-xl uppercase border border-b-gray-300 mb-2">
                              Education
                            </h1>
                            <div className="my-4">
                              {cvState?.academy?.map((a, i) => (
                                <AcademyList academy={a} key={i} />
                              ))}
                            </div>
                          </div>
                        ) : null}
                        {cvState.certificate ? (
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
                <ApButton
                  name="Edit"
                  type="button"
                  onClick={() => setModal({ show: true, data: cvState })}
                  className="bg-red-900 px-4 py-2 mx-4 text-white border-none rounded-md outline-none "
                />
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
