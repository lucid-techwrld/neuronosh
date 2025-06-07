const {
  email_user_auth,
  phone_user_auth,
  verifyOtp,
  googleAuth,
  getUserProfile,
  logout,
} = require("../contollers/AuthController");
const authMiddleWare = require("../middleware/auth");
const otpLimiter = require("../middleware/rateLimiter");
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.post("/email", email_user_auth);
router.post("/phone", phone_user_auth);
router.post("/verify-otp", otpLimiter, verifyOtp);

router.get("/user", authMiddleWare, getUserProfile);
router.get("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

module.exports = router;
