import { useSaves } from "../components/SaveContext";
import empty from "../assets/undraw_no-data_ig65 (1).svg";
import SavedCard from "../components/SavedCard";

const SavedPage = () => {
  const { savedRecipes } = useSaves();
  console.log("Saved Recipes:", savedRecipes);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl  font-bold">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img src={empty} alt="empty" className="w-44 h-44" />
          <p className="text-center mt-5 font-semibold text-gray-600">
            This page will display the recipes you have saved.
          </p>
        </div>
      ) : (
        <div>
          <SavedCard recipe={savedRecipes} />
        </div>
      )}
    </div>
  );
};

export default SavedPage;
