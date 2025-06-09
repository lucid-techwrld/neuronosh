if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/passport");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const RecipeRoute = require("./routes/RecipeRoute");
const AuthRoute = require("./routes/AuthRoute");
const passport = require("passport");
const connectDB = require("./config/mongoDB");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use(helmet());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/recipe", RecipeRoute);
app.use("/api/auth", AuthRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
