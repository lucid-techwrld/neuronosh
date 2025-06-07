const express = require("express");
const router = express.Router();
const {
  generateRecipe,
  saveRecipe,
  getSavedRecipe,
  deleteRecipe,
} = require("../contollers/RecipeController");
const authMiddleWare = require("../middleware/auth");

router.post("/generate-recipe", generateRecipe);
router.post("/save", authMiddleWare, saveRecipe);
router.get("/recipes", authMiddleWare, getSavedRecipe);
router.delete("/delete", authMiddleWare, deleteRecipe);
module.exports = router;
