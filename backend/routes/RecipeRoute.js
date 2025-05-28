const express = require("express");
const router = express.Router();
const { generateRecipe } = require("../contollers/RecipeController");

router.post("/generate-recipe", generateRecipe);

module.exports = router;
