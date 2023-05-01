import axios from "axios";
import { toast } from "react-toastify";
import { IRequestSchema } from "./model";

export const apiReqHandler = async ({
  endPoint,
  payload,
  method,
  bearerAuth,
}: IRequestSchema) => {
  let reqConfig = {
    url: endPoint,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  if (bearerAuth) {
    // @ts-ignore
    reqConfig.headers.Authorization = `Bearer ${bearerAuth}`;
  }

  if (payload) {
    // @ts-ignore
    reqConfig.data = payload;
  }

  try {
    const res = await axios(reqConfig);

    if (!res)
      toast.error("Error sending request", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    if (res && res.data.status === "Error")
      toast.error(res.data.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    if (res?.data?.status === "OK")
      toast.success("Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    return {
      res: res ? res : null,
    };
  } catch (err: any) {
    toast.error(err.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { res: null };
  }
};
