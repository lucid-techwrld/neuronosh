import { Download, Heart, LoaderIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSaves } from "../components/SaveContext";
import { useRecipe } from "../components/RecipeContext";
import image from "../assets/image.png";
import RecipeChefCard from "../components/RecipeChefCard";

const RecipePage = () => {
  const { name } = useParams();
  const { generatedRecipe } = useRecipe();
  const { savedRecipes, handleSaveRecipe, saving } = useSaves();

  const matchingRecipe =
    (generatedRecipe && generatedRecipe.find((item) => item.name === name)) ||
    (savedRecipes && savedRecipes.find((item) => item.name === name));

  return (
    <div className="flex flex-col w-full h-full">
      {matchingRecipe ? (
        <>
          <div className="flex-grow w-full px-5 lg:px-20 space-y-5 text-md lg:text-2xl md:text-xl">
            <h1 className="font-bold mb-10 text-orange-400">
              Generated Recipe
            </h1>
            <RecipeChefCard
              name={matchingRecipe.name}
              desc={matchingRecipe.description}
            />

            <p>
              <strong className="text-orange-400">Description:</strong> <br />
              {matchingRecipe.description}
            </p>

            <p>
              <strong className="text-orange-400">Instructions:</strong> <br />
              {matchingRecipe.instructions}
            </p>

            <div>
              <h3 className="font-semibold mb-2 text-orange-400">
                Ingredients:
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {matchingRecipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full h-20 md:h-24 lg:h-24 shrink-0 flex items-center justify-center gap-4 border-t p-4">
            <button
              onClick={() => handleSaveRecipe(matchingRecipe)}
              aria-label="Save Recipe"
              className="flex items-center gap-2 text-orange-400 hover:bg-orange-400 hover:text-white h-full border-2 border-orange-400 rounded-md px-5"
            >
              {saving ? <LoaderIcon className="animate-spin" /> : <Heart />}
            </button>
            <button className="flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 h-full">
              <Download />
              Download Recipe
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full justify-center items-center space-y-10">
          <img
            src={image}
            alt="image"
            width={"200px"}
            height={"200px"}
            className="mt-5"
          />
          <p className="text-xl text-gray-500 hover:text-gray-600">
            Generate Recipe and check again
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
