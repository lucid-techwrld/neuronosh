const express = require("express");
const router = express.Router();
const {
  generateRecipe,
  saveRecipe,
  getSavedRecipe,
} = require("../contollers/RecipeController");
const authMiddleWare = require("../middleware/auth");

router.post("/generate-recipe", generateRecipe);
router.post("/save", authMiddleWare, saveRecipe);
router.get("/recipes", authMiddleWare, getSavedRecipe);

module.exports = router;
