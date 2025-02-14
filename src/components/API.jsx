const generateRecipe = async (ingredients) => {
  try {
    const response = await fetch('/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredients),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipe`);
    console.error('Failed Response:');
    }

    const data = await response.json();
    //console.log(data.recipe)
    return data.recipe;
  } catch (error) {
    console.error('Error generating recipe:', error.message);
    throw error;
  }
};

export default generateRecipe;
