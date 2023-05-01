export interface ICV {
  personalInfo: IPersonalInfo;
}

export interface IPersonalInfo {
  firstName: string;
  lastName: string;
  description: string;
  profession: string;
  address: string;
  phoneNumber: string;
  country: string;
  image: IFile;
  city: string;
  state: string;
  email: string;
}

interface IFile {
  _id: string;
  uri: string;
  type: string;
  name: string;
}
