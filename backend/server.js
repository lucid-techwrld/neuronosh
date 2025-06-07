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

app.set("trust proxy", 1);
const corsOptions = {
  origin: ["http://localhost:5173", "https://neuronosh.netlify.app"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(helmet());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());

app.use("/api/recipe", RecipeRoute);
app.use("/api/auth", AuthRoute);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
