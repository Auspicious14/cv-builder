import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ApButton } from "../../components";
import { auth, db } from "../../library";
import { IProfile } from "./model";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<IProfile>();

  const getProfile = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const getUser = doc(db, "users", user.uid);
        const userSnapShot = await getDoc(getUser);
        if (userSnapShot.exists()) {
          setProfile(userSnapShot.data() as any);
        }
      }
    });
  };

  const signOut = () => {
    auth.signOut();
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <div>{profile?.displayName}</div>
      <div>{profile?.email}</div>
      <div>{profile?.phoneNumber}</div>
      <div>{profile?.lastName}</div>

      <ApButton type="button" name="Sign Out" onClick={signOut} />
    </>
  );
};
