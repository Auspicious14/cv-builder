import { IAcademy } from "../academic/model";
import { ICertificate } from "../certificate/model";
import { IExperience } from "../experience/model";
import { IPersonalInfo } from "../personalinfo/model";
import { ISkill } from "../skill/model";

export interface ICV {
  personalInformation: IPersonalInfo;
  academic: IAcademy[];
  experience: IExperience[];
  skill: ISkill[];
  certificate: ICertificate[];
}

// interface IAcademy {
//   course: string;
//   school: string;
//   fromDate: string;
//   toDate: string;
// }

// interface IExperience {
//   jobTitle: string;
//   company: string;
//   fromDate: string;
//   toDate: string;
//   description: string;
//   location: string;
// }

// interface ISkill {
//   name: string;
// }
// interface ICertificate {
//   name: string;
//   year: string;
// }

// export interface ICV {
//   personalInfo: IPersonalInfo;
// }

// export interface IPersonalInfo {
//   firstName: string;
//   lastName: string;
//   description: string;
//   profession: string;
//   address: string;
//   phoneNumber: string;
//   country: string;
//   image: IFile;
//   city: string;
//   state: string;
//   email: string;
// }

// interface IFile {
//   _id: string;
//   uri: string;
//   type: string;
//   name: string;
// }
