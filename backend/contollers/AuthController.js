const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createOTP } = require("../helper/otp");
const { generateJwtToken, setAuthCookie } = require("../helper/token");
const bcrypt = require("bcryptjs");
const SendOTP = require("../Emails/SentOTP");
const sendSMS = require("../Emails/SendSMS");
const sendMail = require("../Emails/SendEmail");

// create account with email
const email_user_auth = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.includes("@") || !password) {
    return res.status(400).json({ message: "All feilds are required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      if (user.isVerified) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = generateJwtToken({ userId: user._id, email: user.email });
        setAuthCookie(res, token);
        return res.json({
          message: "Logged in successfully.",
          isVerified: true,
        });
      } else {
        const { otp, hashed, expiresAt } = await createOTP();

        user.otp = hashed;
        user.otpExpiresAt = expiresAt;
        await user.save();
        await SendOTP(email, otp);
        return res.json({
          message: "Verification email sent. Please check your inbox.",
          isVerified: false,
        });
      }
    } else {
      const { otp, hashed, expiresAt } = await createOTP();
      const hashedPasword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: email.toLowerCase(),
        password: hashedPasword,
        provider: "email",
        otp: hashed,
        otpExpiresAt: expiresAt,
        profile: `https://ui-avatars.com/api/?name=${email}&background=random`,
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

// create account with phone number
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

// verifyOTP
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
    await sendMail(user.email);

    return res.json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in verifyOtp:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// create account with google
const googleAuth = async (req, res) => {
  try {
    const tokenPayload = {
      userId: req.user._id,
      email: req.user.email,
    };
    const token = generateJwtToken(tokenPayload);
    setAuthCookie(res, token);
    await sendMail(req.user.email);

    res.redirect("http://localhost:5173");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try agian later",
    });
  }
};

// get curerent user profile
const getUserProfile = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(400).json({ mesage: "Please login and try again" });
  }
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User does not exits" });
    res.status(200).json({
      success: true,
      message: "User fetched succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try agian later",
    });
  }
};

//logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try agian later",
    });
  }
};
module.exports = {
  email_user_auth,
  phone_user_auth,
  googleAuth,
  verifyOtp,
  getUserProfile,
  logout,
};
