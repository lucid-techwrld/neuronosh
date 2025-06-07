const User = require("../models/user");
const SYSTEM_PROMPT = require("../prompt");
const axios = require("axios");

const generateRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({
      message: "Invalid ingredients. Please provide an array of ingredients.",
    });
  }

  try {
    const prompt = `I have the following ingredients: ${ingredients.join(
      ", "
    )}. Generate a full recipe in JSON format.`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free", // or try "openai/gpt-3.5-turbo"
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://localhost:5173", // optional but good for OpenRouter
        },
      }
    );

    let reply = response.data.choices[0].message.content.trim();

    // Remove triple backticks and language identifiers like ```json
    if (reply.startsWith("```")) {
      reply = reply
        .replace(/^```[a-z]*\n?/i, "")
        .replace(/```$/, "")
        .trim();
    }

    let parsedRecipe;
    try {
      parsedRecipe = JSON.parse(reply);
    } catch (parseErr) {
      console.error("Failed to parse JSON from AI:", reply);
      return res.status(500).json({
        error: "Failed to parse recipe. Please try again.",
      });
    }

    res.json({ success: true, recipe: parsedRecipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe." });
  }
};

const saveRecipe = async (req, res) => {
  const { recipe } = req.body;
  const userId = req.user?.userId;
  if (!recipe) {
    return res.status(400).json({ message: "Please provide a recipe" });
  }

  if (!userId) {
    return res.status(401).json({ message: "Please login to save recipe" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadySaved = user.saves.find((r) => r.name === recipe.name);
    if (alreadySaved) {
      return res
        .status(400)
        .json({ message: "Recipe is already saved by the user" });
    }

    user.saves.push(recipe);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Recipe saved successfully",
    });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Error saving recipe, please try again" });
  }
};

const getSavedRecipe = async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Please login to save recipe" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const savedRecipe = user.saves;

    res.status(200).json({
      success: true,
      message: "Recipe saved successfully",
      savedRecipe,
    });
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ error: "Error fetching recipe, please try again" });
  }
};

const deleteRecipe = async (req, res) => {
  const userId = req.user?.userId;
  const { name } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Please login to delete recipe" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipeIndex = user.saves.findIndex((r) => r.name === name);
    if (recipeIndex === -1) {
      return res
        .status(400)
        .json({ message: "Recipe not found in saved recipes" });
    }

    user.saves.splice(recipeIndex, 1);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Error deleting recipe, please try again" });
  }
};

module.exports = {
  generateRecipe,
  saveRecipe,
  getSavedRecipe,
  deleteRecipe,
};
