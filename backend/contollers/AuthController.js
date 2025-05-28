const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createOTP } = require("../helper/otp");
const { generateJwtToken, setAuthCookie } = require("../helper/token");
const bcrypt = require("bcryptjs");
const SendOTP = require("../Emails/SentOTP");
const sendSMS = require("../Emails/SendSMS");

const email_user_auth = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      if (user.isVerified) {
        const token = generateJwtToken({ userId: user._id, email: user.email });
        setAuthCookie(res, token);
        return res.json({ message: "Logged in successfully." });
      } else {
        const { otp, hashed, expiresAt } = await createOTP();

        user.otp = hashed;
        user.otpExpiresAt = expiresAt;
        await user.save();
        await SendOTP(email, otp);
        return res.json({
          message: "Verification email sent. Please check your inbox.",
        });
      }
    } else {
      const { otp, hashed, expiresAt } = await createOTP();

      const newUser = new User({
        email: email.toLowerCase(),
        provider: "email",
        otp: hashed,
        otpExpiresAt: expiresAt,
      });

      await newUser.save();
      await SendOTP(email, otp);
      return res.json({
        message: "Verification email sent. Please check your inbox.",
      });
    }
  } catch (error) {
    console.log("Error in userAuth:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const phone_user_auth = async (req, res) => {
  const normalizePhone = (phone) => phone.replace(/\D/g, "");
  let { phone } = req.body;

  if (!phone || typeof phone !== "string") {
    return res.status(400).json({ message: "Invalid Phone Number." });
  }
  phone = normalizePhone(phone);

  try {
    const user = await User.findOne({ phone });
    if (user) {
      if (user.isVerified) {
        const token = generateJwtToken({ userId: user._id, phone: user.phone });
        setAuthCookie(res, token);
        return res.json({ message: "Logged in successfully." });
      } else {
        const { otp, hashed, expiresAt } = await createOTP();

        user.otp = hashed;
        user.otpExpiresAt = expiresAt;
        await user.save();
        await sendSMS(phone, otp);
        return res.json({
          message: "OTP has been sent to SMS. Please check your inbox.",
        });
      }
    } else {
      const { otp, hashed, expiresAt } = await createOTP();

      const newUser = new User({
        phone,
        provider: "phone",
        otp: hashed,
        otpExpiresAt: expiresAt,
      });

      await newUser.save();
      await sendSMS(phone, otp);
      return res.json({
        message: "OTP has been sent to SMS. Please check your inbox.",
      });
    }
  } catch (error) {
    console.log("Error in userAuth:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const verifyOtp = async (req, res) => {
  const { email, phone, otp } = req.body;

  if (!otp || (!email && !phone)) {
    return res
      .status(400)
      .json({ message: "OTP and either email or phone are required." });
  }

  try {
    let query = {};
    if (email) query.email = email.toLowerCase();
    else query.phone = phone;

    const user = await User.findOne(query);
    if (!user || !user.otp || !user.otpExpiresAt) {
      return res
        .status(400)
        .json({ message: "Invalid request or OTP not sent." });
    }

    if (user.otpExpiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.isVerified = true;
    await user.save();

    const tokenPayload = {
      userId: user._id,
      email: user.email,
      phone: user.phone,
    };

    const token = generateJwtToken(tokenPayload);
    setAuthCookie(res, token);

    return res.json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in verifyOtp:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const googleAuth = (req, res) => {
  try {
    const tokenPayload = {
      userId: req.user._id,
      email: req.user.email,
    };
    const token = generateJwtToken(tokenPayload);

    setAuthCookie(res, token);
    res.redirect("http://localhost:5173");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try agian later",
    });
  }
};

module.exports = { email_user_auth, phone_user_auth, googleAuth, verifyOtp };
