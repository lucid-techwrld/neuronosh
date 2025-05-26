import { createContext, useContext, useState, useEffect } from "react";

const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleSaveRecipe = (recipe) => {
    const existingRecipe = savedRecipes.find((r) => r.name === recipe.name);
    if (existingRecipe) return;
    setSavedRecipes((prev) => [...prev, recipe]);
    console.log("Recipe saved:", recipe);
  };

  const handleDelete = (name) => {
    const updatedRecipe = savedRecipes.filter((recipe) => recipe.name !== name);
    setSavedRecipes(updatedRecipe);
  };

  return (
    <SaveContext.Provider
      value={{ savedRecipes, setSavedRecipes, handleSaveRecipe, handleDelete }}
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
