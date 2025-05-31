const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unathorized Please login and try again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Please login and try again" });
  }
};

module.exports = authMiddleWare;
