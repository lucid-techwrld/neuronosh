const bcrypt = require("bcryptjs");

function generateRawOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function hashOTP(otp) {
  const hashed = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  return { hashed, expiresAt };
}

async function createOTP() {
  const otp = generateRawOTP();
  const { hashed, expiresAt } = await hashOTP(otp);
  return { otp, hashed, expiresAt };
}

module.exports = {
  createOTP,
  generateRawOTP,
  hashOTP,
};
