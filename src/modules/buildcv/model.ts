import { IAcademy } from "../academic/model";
import { IPersonalInfo } from "../personalinfo/model";
import { ISkill } from "../skill/model";

export interface ICV {
  personalInfo: IPersonalInfo;
  skill: ISkill;
  academy: IAcademy;
}
