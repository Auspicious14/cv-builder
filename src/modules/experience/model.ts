export interface IExperience {
  jobTitle: string;
  organization: string;
  fromDate?: Date | string | number | any;
  toDate?: Date|string | number | any;
  description: string;
  location: string;
}


export const ICategory =[ 
  {
    label: "Software Engineer",
  name: 'softwareEngineer'
  },
  {
    label: "lawyer",
    name: 'lawyer'
  },
  {
    label: 'doctor',
    name: 'doctor'
  },
  {
    label: 'Accountant',
    name: 'accountant'
  },
  {
    label: 'Nurse',
    name: 'nurse'
  },
  {
    label: 'educationist',
    name: 'educationist'
  },
]