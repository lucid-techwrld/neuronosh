import React, { useEffect, useState } from "react";
import bg from "../assets/bg.jpg";
import { Loader2Icon, PlusCircle } from "lucide-react";
import IngredientList from "../components/IngredientList";
import Recommend from "../components/Recommend";
import { useRecipe } from "../components/RecipeContext";
import { useNavigate } from "react-router-dom";
import recommend from "../recommend";

const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const { generateRecipe } = useRecipe();
  const navigate = useNavigate();

  const handleGenerateRecipe = async () => {
    try {
      setLoading(true);
      if (ingredients <= 0) return;
      const recipe = await generateRecipe({ ingredients });
      if (recipe?.name) {
        navigate(`/recipe/${recipe?.name}`);
      } else {
        console.log("Recipe is empty ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredients = (event) => {
    event.preventDefault();
    const ingredient = event.target[0].value;
    if (!ingredient) return;

    if (ingredients.includes(ingredient)) return;

    setIngredients((prev) => [...prev, ingredient]);
    event.target.reset();
  };

  const removeIngredient = (item) => {
    console.log(item);
    const newIngredient = ingredients.filter((ingredient) => {
      return ingredient !== item;
    });
    setIngredients(newIngredient);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src={bg}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Foreground Content */}
      <div className="absolute inset-0 flex flex-col items-center z-10 mt-5 lg:mt-10 md:mt-10 bg-white/60 backdrop-blur-sm px-3">
        <div className="w-full lg:w-[60%] md:w-[60%] flex flex-col items-center">
          <p className="text-center text-xl">
            <span className="font-bold text-2xl text-orange-400">
              NeuroNosh
            </span>{" "}
            is your intelligent kitchen companion that turns your leftover
            ingredients into delicious, chef-inspired meals — instantly. Just
            tell NeuroNosh what’s in your fridge or pantry, and it uses AI to
            generate unique recipes tailored to what you already have. Whether
            you’re trying to save time, reduce food waste, or explore creative
            new dishes, NeuroNosh helps you cook smarter, not harder.
          </p>

          {/* Ingredient Form */}
          <form
            onSubmit={(e) => handleIngredients(e)}
            className="w-full flex flex-col justify-center items-center mt-5"
          >
            <div className="w-full relative flex justify-center items-center mt-10">
              <input
                type="text"
                placeholder="add ingredient..."
                className="w-full bg-orange-400 rounded-2xl pl-5 pr-12 py-5 outline-none placeholder:text-white"
              />
              <button type="submit" className="absolute right-5">
                <PlusCircle className="w-7 h-7 text-white hover:text-gray-200" />
              </button>
            </div>

            {/* Ingredient List */}
            {ingredients.length > 0 && (
              <IngredientList
                ingredients={ingredients}
                removeIngredient={removeIngredient}
              />
            )}
            <button
              onClick={() => handleGenerateRecipe()}
              className="w-[60%] mt-5 rounded-full px-7 py-5 bg-[linear-gradient(270deg,_#fdba74,_#fde68a,_#fca5a5)] bg-[length:400%_400%] animate-gradient-border font-semibold text-white hover:text-black flex justify-center items-center"
            >
              {loading ? (
                <Loader2Icon className="w-8 h-8 animate-spin" />
              ) : (
                <span>Generate Recipe</span>
              )}
            </button>
          </form>

          <p className="italic">...no need to shop for extra items</p>
        </div>

        {/* Recommended Recipes */}
        <div className="mt-20 flex flex-col w-full justify-start lg:px-10 md:px-7">
          <h2 className="font-bold text-xl">Recommended Recipes</h2>
          <Recommend recommend={recommend} />
        </div>
      </div>
    </div>
  );
};

export default Home;
