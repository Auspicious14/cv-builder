import { toast } from "react-toastify";

export const toastSvc = {
  success: (msg: string) => {
    toast.success(msg, { hideProgressBar: true });
  },
  error: (msg: string) => {
    toast.error(msg, { hideProgressBar: true });
  },
};
