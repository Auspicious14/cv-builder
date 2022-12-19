import { collection, doc, getDoc } from "firebase/firestore";
import React, { createContext } from "react";
import { db } from "../../library";

interface IProfileState {}

const ProfileContext = createContext<IProfileState>({});

export const useProfileContext = () => {
  const context = React.useContext(ProfileContext);
  if (context) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const ProfileContextProvider: React.FC<IProps> = ({ children }) => {
  const createProfileDocument = () => {
    // const getUsers = getDoc(db, '')
    const profileDocRef = doc(collection(db, "profiles"));
  };
  return <ProfileContext.Provider value={{}}></ProfileContext.Provider>;
};
