import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCvState } from "../../buildcv/context";
import { getCookie } from "../../../services/helper";
import { FigPersonalIfo } from "./components/personalInfo";
import { FigEducation } from "./components/education";
import { FigCertificate } from "./components/certificate";
import { FigSkill } from "./components/skill";
import { FigExperience } from "./components/experience";

export const FiGPage = () => {
  const { cvState, getCVDocument } = useCvState();
  const userId = getCookie("user_id");
  useEffect(() => {
    getCVDocument(userId);
  }, []);
  console.log(cvState, userId);
  return (
    <div className="flex justify-center">
      <div className="w-[612px] h-[792px] px-[50px] pt-12 pb-[76px] bg-white flex-col justify-start items-start gap-[60px] inline-flex">
        <FigPersonalIfo personalInfo={cvState?.personalInformation} />
        <div className="self-stretch justify-start items-start gap-[34px] inline-flex">
          <div className="flex-col justify-start items-start gap-8 inline-flex">
            {/* <div className="h-[92px] flex-col justify-start items-start gap-5 flex">
              <div className="text-center text-gray-400 text-[12px] font-bold leading-none">
                Education
              </div>
              <div className="self-stretch h-14 flex-col justify-start items-start gap-3 flex">
                <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
                  <div className="justify-start items-baseline gap-2 inline-flex">
                    <div className="text-black text-[12px] font-bold leading-none">
                      Cornell University
                    </div>
                    <div className="text-black text-[12px] font-normal leading-none">
                      /
                    </div>
                    <div className="text-black text-[12px] font-normal leading-none">
                      BA HCD
                    </div>
                  </div>
                  <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
                    2017 – 2021
                  </div>
                </div>
                <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
                  Graduated Cum Laude
                </div>
              </div>
            </div> */}
            <div className="text-center text-gray-400 text-[12px] font-bold leading-none">
              Education
            </div>
            {cvState?.academic?.map((a) => (
              <FigEducation academy={a} key={a?._id} />
            ))}
            <div className="h-[164px] flex-col justify-start items-start gap-5 flex">
              <div className="text-center text-gray-400 text-[12px] font-bold leading-none">
                Academic Achievements
              </div>
              {/* <div className="self-stretch h-12 flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch h-7 flex-col justify-start items-start gap-1 flex">
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="text-black text-[9px] font-bold leading-3">
                      Graduated Cum Laude
                    </div>
                    <div className="text-zinc-500 text-[9px] font-normal leading-3">
                      /
                    </div>
                    <div className="text-zinc-500 text-[9px] font-normal leading-3">
                      Cornell University
                    </div>
                  </div>
                  <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
                    2021
                  </div>
                </div>
                <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
                  Top 3% class GPA
                </div>
              </div> */}
              {/* <div className="self-stretch h-[60px] flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch h-7 flex-col justify-start items-start gap-1 flex">
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="text-black text-[9px] font-bold leading-3">
                      Best SAT Distinction
                    </div>
                    <div className="text-zinc-500 text-[9px] font-normal leading-3">
                      /
                    </div>
                    <div className="text-zinc-500 text-[9px] font-normal leading-3">
                      Mayor of Ohio
                    </div>
                  </div>
                  <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
                    2016
                  </div>
                </div>
                <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
                  Awarded by the mayor after getting the best SAT score in Ohio.
                </div>
              </div> */}
              {cvState?.certificate?.map((c) => (
                <FigCertificate certificate={c} key={c?._id} />
              ))}
            </div>
            <div className="h-[188px] flex-col justify-start items-start gap-5 flex">
              <div className="text-center text-gray-400 text-[12px] font-bold leading-none">
                Skills & Languages
              </div>
              <div className="self-stretch h-[84px] flex-col justify-start items-start flex">
                <div className="w-[191px] text-black text-[9px] font-bold leading-3">
                  Skills:
                </div>
                <div className="w-[191px] flex gap-2 items-center text-zinc-500 text-[9px] font-normal leading-3">
                  {cvState?.skill?.map((s) => (
                    <FigSkill skill={s} key={s?._id} />
                  ))}
                </div>
              </div>
              <div className="self-stretch h-12 flex-col justify-start items-start flex">
                <div className="w-[191px] text-black text-[9px] font-bold leading-3">
                  Languages:{" "}
                </div>
                <div className="w-[191px] text-zinc-500 text-[9px] font-normal leading-3">
                  Spanish (Native) English (Advanced). 110/120 TOEFL Score.
                  Portuguese (Intermediate)
                </div>
              </div>
            </div>
          </div>
          <div className="w-[287px] flex-col justify-start items-start gap-5 inline-flex">
            <div className="text-center text-gray-400 text-[12px] font-bold leading-none">
              Experience
            </div>
            {cvState?.experience?.map((e) => (
              <FigExperience experience={e} key={e?._id} />
            ))}
            {/* <div className="self-stretch h-28 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch justify-start items-baseline gap-2 inline-flex">
                  <div className="text-black text-[12px] font-bold leading-none">
                    Lyft
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    /
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    Product Design Lead
                  </div>
                </div>
                <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
                  SEP 2022 – PRESENT
                </div>
              </div>
              <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
                Working closely with backend and frontend engineers to ensure
                our digital solutions can meet clients' deadlines, expectations
                and needs. Complete ownership over the design process from
                collecting clients' needs to deployment of our services, which
                includes wireframing, design, prototyping, and testing.
              </div>
            </div>
            <div className="self-stretch h-28 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch justify-start items-baseline gap-2 inline-flex">
                  <div className="text-black text-[12px] font-bold leading-none">
                    Uber
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    /
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    Product Designer, Design Systems
                  </div>
                </div>
                <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
                  MAR 2022 – SEP 2022
                </div>
              </div>
              <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
                Managed, documented and implemented the Design System for the
                company’s products and services ensuring scalability and ease of
                implementation Collaborated closely with backend, frontend, and
                mobile engineers, as well as the sales team.
              </div>
            </div>
            <div className="self-stretch h-[124px] flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch justify-start items-baseline gap-2 inline-flex">
                  <div className="text-black text-[12px] font-bold leading-none">
                    Global Studio
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    /
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    Design Consultant
                  </div>
                </div>
                <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
                  AUG 2021 – FEB 2022
                </div>
              </div>
              <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
                Complete ownership over the design process from collecting
                clients' needs to deployment of our services, which includes
                wireframing, design, prototyping, and testing. Led the design of
                new landing pages for businesses with an emphasis on adding
                value to customers and the increase in sales through the
                creation of various business plans that fit their needs.
              </div>
            </div>
            <div className="self-stretch h-28 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch h-8 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch justify-start items-baseline gap-2 inline-flex">
                  <div className="text-black text-[12px] font-bold leading-none">
                    Andrew & Co
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    /
                  </div>
                  <div className="text-black text-[12px] font-normal leading-none">
                    UX/UI Designer
                  </div>
                </div>
                <div className="self-stretch text-gray-400 text-[9px] font-normal leading-3">
                  JUN 2020 – JUL 2021
                </div>
              </div>
              <div className="self-stretch text-zinc-500 text-[9px] font-normal leading-3">
                During my time leading design at Andrew & Co, the company’s
                monthly revenue increased over 410% through a redesigned B2B
                dashboard for the candidate pipeline and process. Helped with
                the design and storytelling of the Business Pitch that allowed
                the company to close a $250K Pre Seed Round.
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
