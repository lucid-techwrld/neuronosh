import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleSaveRecipe = async (recipe) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/recipe/save`,
        { recipe },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data.message);
    } catch (error) {
      console.log("Save Error", error.res?.data || error.message);
    }
  };

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/recipe/recipes`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      setSavedRecipes(res.data.savedRecipe);
    } catch (error) {
      console.log("Save Error", error.res?.data || error.message);
    }
  };

  const handleDelete = (name) => {
    const updatedRecipe = savedRecipes.filter((recipe) => recipe.name !== name);
    setSavedRecipes(updatedRecipe);
  };

  return (
    <SaveContext.Provider
      value={{
        savedRecipes,
        setSavedRecipes,
        handleSaveRecipe,
        handleDelete,
        fetchRecipe,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export const useSaves = () => {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error("useSaves must be used within a SaveProvider");
  }
  return context;
};
