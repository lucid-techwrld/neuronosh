import axios from "axios";
import { toast } from "sonner";

const verifyOTP = async (otp, email) => {
  //console.log(otp, email);
  try {
    if (!navigator.onLine) {
      toast.error("You're offline. Check your internet connection.");
      return;
    }

    const res = await axios.post(`/api/auth/verify-otp`, { otp, email });

    console.log(res.data);
    toast.success("OTP verified successfully!");
    return { success: res.data.success, error: null };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong. Please try again.";

    console.log("Error Verifying OTP:", message);
    toast.error(message);
  }
};

export default verifyOTP;
