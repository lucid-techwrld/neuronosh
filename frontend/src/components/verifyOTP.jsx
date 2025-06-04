import axios from "axios";

const verifyOTP = async (otp, email) => {
  console.log(otp, email);
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/api/auth/verify-otp`,
      { otp, email }
    );

    console.log(res.data);
    return { success: res.success, error: null };
  } catch (error) {
    const message = error.response?.data?.message || "An error occurred";
    console.error("Error verifying OTP:", message);
  }
};

export default verifyOTP;
