import { Download, Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import recipes from "../recipeData";
import { useSaves } from "../components/SaveContext";
import { useRecipe } from "../components/RecipeContext";

const RecipePage = () => {
  const { name } = useParams();
  console.log("Recipe Name:", name);
  const { generatedRecipe } = useRecipe();
  const { handleSaveRecipe } = useSaves();
  console.log("recipe", generatedRecipe);

  return (
    <div className="flex flex-col w-full h-full">
      {generatedRecipe ? (
        <>
          <div className="flex-grow w-full px-5 lg:px-20 space-y-5">
            <h1 className="text-xl font-bold mb-10 text-orange-400">
              Generated Recipe
            </h1>

            <h2 className="text-md font-bold">
              {generatedRecipe.name?.toUpperCase()}
            </h2>

            <p>
              <strong>Description:</strong> <br />
              {generatedRecipe.description}
            </p>

            <p>
              <strong>Instructions:</strong> <br />
              {generatedRecipe.instructions}
            </p>

            <div>
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside space-y-1">
                {generatedRecipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full h-20 md:h-24 lg:h-24 shrink-0 flex items-center justify-center gap-4 border-t p-4">
            <button
              onClick={() => handleSaveRecipe(generatedRecipe)}
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
        </>
      ) : (
        <div className="flex w-full justify-center">
          Generate Recipe and check again
        </div>
      )}
    </div>
  );
};

export default RecipePage;
