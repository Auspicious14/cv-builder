export interface ICV {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  file: string;
  address: string;
  description: string;
  country: string;
  city: string;
  state: string;
  email: string;
  academy: IAcademy[];
  experience: IExperience[];
  skill: ISkill[];
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
}

interface ISkill {
  skillName: string;
}
