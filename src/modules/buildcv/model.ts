export interface ICV {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  file: string;
  address: string;
  description: string;
  profession: string;
  country: string;
  city: string;
  state: string;
  email: string;
  academy: IAcademy[];
  experience: IExperience[];
  skill: ISkill[];
  certificate: ICertificate[];
}

interface IAcademy {
  course: string;
  name: string;
  fromDate: string;
  toDate: string;
}

interface IExperience {
  jobTitle: string;
  organization: string;
  fromDate: string;
  toDate: string;
  description: string;
  location: string;
}

interface ISkill {
  skillName: string;
}
interface ICertificate {
  name: string;
}
