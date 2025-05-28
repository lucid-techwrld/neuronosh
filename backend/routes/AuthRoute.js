const {
  email_user_auth,
  phone_user_auth,
  verifyOtp,
  googleAuth,
} = require("../contollers/AuthController");
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.post("/email", email_user_auth);
router.post("/phone", phone_user_auth);
router.post("/verify-otp", verifyOtp);

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
