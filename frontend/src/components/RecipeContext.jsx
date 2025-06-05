import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import recipes from "../recipeData";
import { useSaves } from "./SaveContext";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const { savedRecipes } = useSaves();
  const [generatedRecipe, setGeneratedRecipe] = useState(recipes);

  const generateRecipe = async ({ ingredients }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/recipe/generate-recipe`,
        { ingredients },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const recipe = res.data.recipe;
      console.log(recipe);
      setGeneratedRecipe((prev) => [...prev, res.data.recipe]);
      return recipe;
    } catch (error) {
      console.log("Generate Recipe Error", error.res?.data || error.message);
    }
  };
  return (
    <RecipeContext.Provider value={{ generateRecipe, generatedRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("Recipe context is undefined");
  }
  return context;
};
