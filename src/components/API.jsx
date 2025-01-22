const generateRecipe = async (ingredients) => {
  try {
    const response = await fetch('http://localhost:5000/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredients), // Send the plain array directly
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }

    const data = await response.json();
    return data.recipe; // Extract the recipe from the response
  } catch (error) {
    console.error('Error generating recipe:', error.message);
    throw error;
  }
};

export default generateRecipe;