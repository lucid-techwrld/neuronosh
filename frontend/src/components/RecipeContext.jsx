import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import recipes from "../recipeData";
import { useSaves } from "./SaveContext";
import { toast } from "sonner";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const { savedRecipes, setSavedRecipes } = useSaves();
  const [generatedRecipe, setGeneratedRecipe] = useState(recipes);

  const generateRecipe = async ({ ingredients }) => {
    try {
      if (!navigator.onLine) {
        toast.error("You're offline. Check your internet connection.");
        return;
      }
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
      setGeneratedRecipe((prev) => [...prev, res.data.recipe]);
      return res.data.recipe;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      // console.log("Generate Recipe Error:", message);
      toast.error(message);
    }
  };

  const handleDeleteRecipe = async (name) => {
    try {
      if (!navigator.onLine) {
        toast.error("You're offline. Check your internet connection.");
        return;
      }

      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL}/api/recipe/delete`,
        {
          data: { name },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      let updatedRecipe;
      if (res.data.success) {
        toast.success(res.data.message || "Recipe deleted successfully!");
        updatedRecipe = savedRecipes.filter((recipe) => recipe.name !== name);
      }
      setSavedRecipes(updatedRecipe);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      //console.log("Delete Recipe Error:", message);
      toast.error(message);
    }
  };

  return (
    <RecipeContext.Provider
      value={{ generateRecipe, generatedRecipe, handleDeleteRecipe }}
    >
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
