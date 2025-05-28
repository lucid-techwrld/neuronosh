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
  } catch (err) {
    console.error("Error generating recipe:", err.message);
    res.status(500).json({ error: "Failed to generate recipe." });
  }
};

module.exports = {
  generateRecipe,
};
