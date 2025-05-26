import { Download, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import recipes from "../recipeData";
import { useSaves } from "../components/SaveContext";

const RecipePage = () => {
  const { name } = useParams();
  console.log("Recipe Name:", name);
  const { handleSaveRecipe } = useSaves();

  const Recipe = recipes.find((recipe) => recipe.name === name);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Top Section */}
      <div className="flex-grow">
        <div className="p-4 flex">
          <p className="text-xl md:text-2xl lg:text-2xl font-bold">
            Generated Recipe
          </p>
        </div>
      </div>

      {/* Recipe Details */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">{name}</h2>
          <p className="text-gray-700 mb-4">
            {recipes.find((recipe) => recipe.name === name)?.desc}
          </p>
          <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside mb-4">
            {recipes
              .find((recipe) => recipe.name === name)
              ?.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside text-gray-700">
            {recipes
              .find((recipe) => recipe.name === name)
              ?.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
          </ol>
        </div>
      </div>
      {/* Bottom Buttons */}
      <div className="w-full h-20 md:h-24 lg:h-24 shrink-0 flex items-center justify-center gap-4 border-t p-4">
        <button
          onClick={() => handleSaveRecipe(Recipe)}
          aria-label="Save Recipe"
          className="flex items-center gap-2 text-orange-400 hover:bg-orange-400 hover:text-white h-full border-2 border-orange-400 rounded-md px-5"
        >
          <Heart />
        </button>
        <button className="flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 h-full">
          <Download />
          Download Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
