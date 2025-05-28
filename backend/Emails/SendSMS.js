const vonage = require("../utils/nexmo");

const sendSMS = async (to, otp) => {
  const from = "NeuroNosh";
  const text = `Your OTP Verification code is ${otp}`;

  try {
    const response = await vonage.sms.send({ to, from, text });
    return response;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

module.exports = sendSMS;
