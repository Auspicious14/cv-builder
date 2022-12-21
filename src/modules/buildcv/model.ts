import { IAcademy } from "../academic/model";
import { IPersonalInfo } from "../personalinfo/model";
import { ISkill } from "../skill/model";

export interface ICV {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  description: string;
  country: string;
  city: string;
  state: string;
  email: string;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  skill5: string;
  secondarySchool: string;
  university: string;
  stateofSchool: string;
  createdAt: string;
  graduatedAt: string;
}
