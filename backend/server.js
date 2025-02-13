require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { HfInference } = require('@huggingface/inference');

const app = express();
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

const corsOptions = {
  origin: 'http://localhost:5173', // Change this when deploying
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());

const SYSTEM_PROMPT = `You are an assistant that suggests recipes based on ingredients provided by the user.`;

app.post('/generate-recipe', async (req, res) => {
  const ingredients = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Invalid ingredients. Please provide an array of ingredients.' });
  }

  try {
    const response = await hf.chatCompletion({
      model: 'mistralai/Mistral-Nemo-Instruct-2407',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `I have ${ingredients.join(', ')}. Give me a recipe!` },
      ],
      max_tokens: 1024,
    });

    res.json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
