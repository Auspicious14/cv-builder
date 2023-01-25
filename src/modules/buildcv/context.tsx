import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import jsPDF from "jspdf";
import React, { createContext, useContext, useState } from "react";
import { auth, db, storage } from "../../library";
import { ICV } from "./model";

interface ICvState {
  imageFile: string;
  cvState: ICV;
  getCVDocument: () => void;
  getImageFile: (imageUpload?: any) => void;
  uploadImageDocument: (image: any) => void;
  uploadFileDocument: (image: any) => void;
  downloadCV: (text?: string) => void;
  updateCVDocument: (response: any) => Promise<DocumentReference<DocumentData>>;
}
const CVContext = createContext<ICvState>({
  imageFile: "",
  cvState: null as any,
  getCVDocument() {},
  getImageFile(imageUpload) {},
  updateCVDocument(response) {
    return null as any;
  },
  uploadImageDocument(image) {},
  uploadFileDocument(image) {},
  downloadCV() {},
});

export const useCvState = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const CVContetxProvider: React.FC<IProps> = ({ children }) => {
  const [cvState, setCvState] = useState<ICV>() as any;
  const [imageFile, setImageFile] = useState("");
  // const [text, setText] = useState<string>('')
  const downloadCV = (text?: string) => {
    const exportCV = new jsPDF();
    exportCV.GState(cvState);
    exportCV.save("a4.pdf");
  };
  const getCVDocument = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cvDocRef = doc(db, "cv", user.uid);
        const cvSnapShot = await getDoc(cvDocRef);
        if (cvSnapShot.exists()) {
          console.log(cvSnapShot.data(), "cv dataaaaaa");
          setCvState(cvSnapShot.data() as any);
        }
        return cvDocRef;
      }
    });
  };

  const updateCVDocument = async (response: any) => {
    const user: any = auth.currentUser;
    const cvDocRef = doc(db, "cv", user.uid);
    const data = await updateDoc(cvDocRef, response).then((snapShot: any) => {
      console.log(snapShot);
      const update = snapShot;
      if (update) {
        setCvState(update);
      }
    });
    console.log(data);
    return cvDocRef;
  };

  const uploadImageDocument = (imageUpload: any) => {
    if (imageUpload === null) return;
    const user = auth.currentUser;
    const imageRef = ref(storage, `images/${imageUpload.name}${user?.uid}`);
    const response = uploadBytes(imageRef, imageUpload).then((res) => {
      alert("image uploaded");
      console.log(res.ref);
      // updateCVDocument({ file: res.ref.fullPath }).then((res) =>
      //   console.log("file added")
      // );
    });
  };
  const uploadFileDocument = (imageUpload: any) => {
    if (imageUpload === null) return;
    const user = auth.currentUser;
    const imageRef = ref(storage, `images/${user?.uid}`);
    const response = uploadBytes(imageRef, imageUpload).then((res) => {
      alert("image uploaded");
      console.log(res.ref);
      // updateCVDocument({ file: res.ref.fullPath }).then((res) =>
      //   console.log("file added")
      // );
    });
  };

  const getImageFile = (imageUpload?: any) => {
    const imageRef = ref(storage, "images/");
    listAll(imageRef).then((res) => {
      res.items?.map((url) => {
        getDownloadURL(url).then((res) => setImageFile(res));
      });
    });
  };

  return (
    <CVContext.Provider
      value={{
        imageFile,
        cvState,
        getCVDocument,
        updateCVDocument,
        uploadImageDocument,
        uploadFileDocument,
        downloadCV,
        getImageFile,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};
