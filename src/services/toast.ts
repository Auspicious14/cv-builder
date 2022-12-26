import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastSvc = {
  success: (msg: string) => {
    toast.success(msg, { hideProgressBar: true });
  },
  error: (msg: string) => {
    toast.error(msg, { hideProgressBar: true });
  },
};
