require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { HfInference } = require('@huggingface/inference');

const app = express();
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

const corsOptions = {
  origin: 'https://chefclaudeai.onrender.com',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json());

const emph = "```markdown";
const SYSTEM_PROMPT = `You are an assistant that suggests recipes based on ingredients provided by the user. 
You must format your response in Markdown but do NOT wrap the response in triple backticks or use "${emph}". Just return the formatted Markdown content directly.`;


app.post('/generate-recipe', async (req, res) => {
  //console.log('incoming request: ', req.body)
  const ingredients = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Invalid ingredients. Please provide an array of ingredients.' });
  }

  try {
    const response = await hf.chatCompletion({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `I have ${ingredients.join(', ')}. Give me a recipe!` },
      ],
      max_tokens:1024,
    });
    
res.json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error('Errorr:', err.message);
    res.status(500).json({ error: 'Failed to generate recipe from backend' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, 
() => console.log(`Server running on port ${PORT}`));



/*
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const corsOptions = {
  origin: ['https://chefclaudeai.onrender.com', 'http://localhost:5173'], // Change this when deploying
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
    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
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
*/
