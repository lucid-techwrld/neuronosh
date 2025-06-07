import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import recipes from "../recipeData";
import { useUser } from "./UserContext";
import { toast } from "sonner";

const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const { isLoggedIn } = useUser();
  const [savedRecipes, setSavedRecipes] = useState(null);
  const [saving, setVaing] = useState(false);

  const handleSaveRecipe = async (recipe) => {
    try {
      if (!navigator.onLine) {
        toast.error("You're offline. Check your internet connection.");
        return;
      }

      setVaing(true);
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
      //console.log(res.data.message);
      toast.success(res.data.message || "Recipe saved successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      //console.log("Save Error:", message);
      toast.error(message);
    } finally {
      setVaing(false);
    }
  };

  const fetchRecipe = async () => {
    try {
      if (!navigator.onLine) {
        toast.error("You're offline. Check your internet connection.");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/recipe/recipes`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSavedRecipes(res.data.savedRecipe || []);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      //console.log("Error Fetching Recipe:", message);
      toast.error(message);
      setSavedRecipes([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setSavedRecipes(null);
      fetchRecipe();
    } else {
      setSavedRecipes(recipes);
    }
  }, [isLoggedIn]);

  return (
    <SaveContext.Provider
      value={{
        savedRecipes,
        setSavedRecipes,
        handleSaveRecipe,
        fetchRecipe,
        saving,
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
