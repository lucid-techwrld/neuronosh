const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
}

module.exports = {
  generateJwtToken,
  setAuthCookie,
};
