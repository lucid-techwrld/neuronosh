const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
    enum: ["email", "google", "icloud", "phone"],
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  saves: [],
  otp: String,
  otpExpiresAt: Date,
  profile: String,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
