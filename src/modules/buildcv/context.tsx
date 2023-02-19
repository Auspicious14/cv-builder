import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { createContext, useContext, useState } from "react";
import { auth, db, storage } from "../../library";
import { toastSvc } from "../../services/toast";
import { ICV } from "./model";

interface ICvState {
  imageFile: string;
  imageSource: string;
  cvState: ICV;
  getCVDocument: () => void;
  displayImage: () => void;
  getImageFile: (imageUpload?: any) => void;
  uploadImageDocument: (image: any) => void;
  uploadFileDocument: (image: any) => void;
  updateCVDocument: (response: any) => Promise<DocumentReference<DocumentData>>;
}
const CVContext = createContext<ICvState>({
  imageFile: "",
  imageSource: "",
  cvState: null as any,
  getCVDocument() {},
  displayImage() {},
  getImageFile(imageUpload) {},
  updateCVDocument(response) {
    return null as any;
  },
  uploadImageDocument(image) {},
  uploadFileDocument(image) {},
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
  const user = auth.currentUser;
  const [cvState, setCvState] = useState<ICV>() as any;
  const [imageFile, setImageFile] = useState("");
  const [imageSource, setImageSource] = useState("");
  // const [text, setText] = useState<string>('')

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
    const imageRef = ref(storage, `images/${user?.uid}`);
    listAll(imageRef).then((res) => {
      res.items?.map((url) => {
        getDownloadURL(url).then((res) => setImageFile(res));
      });
    });
  };

  const displayImage = () => {
    getDownloadURL(ref(storage, `images/${user?.uid}`))
      .then((url) => {
        // This can be downloaded directly:
        if (!url) {
          console.log("user added no image");
          return;
        }
        setImageSource(url);
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = "blob";
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open("GET", url);
        // xhr.send();

        // Or inserted into an <img> element
        // const img = document.getElementById('myimg');
        // img.setAttribute('src', url);
      })
      .catch((err) => {
        switch (err) {
          case "storage/object-not-found":
            return console.log("no image was added");
        }
      });
  };

  return (
    <CVContext.Provider
      value={{
        imageFile,
        imageSource,
        cvState,
        getCVDocument,
        updateCVDocument,
        uploadImageDocument,
        uploadFileDocument,
        getImageFile,
        displayImage,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};
