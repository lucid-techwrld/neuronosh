import {
  useState
} from 'react';
import image from '../assets/image.png';
import Recipe from './Recipe';
import generateRecipe from './API.jsx';


const Ingredients = ({
  ingredients
}) => {
  const IngredientList = ingredients.map((item, index) => <li key={index}>{item}</li>);


  const [recipe,
    setRecipe] = useState("");
  const [loading,
    setLoading] = useState(false);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const result = await generateRecipe(ingredients);
      setRecipe(result);
    } catch (error) {
      console.error('Failed to fetch recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const emptyIngredientsMessage = (
    <div className="flex flex-col justify-center items-center">
      <img src={image} alt="Empty Ingredients" className="w-[300px] h-[250px] mt-24" />
    <div className="marquee">
      Add at least 3 ingredients to get a recipe...
    </div>
  </div>
);

return (
  <>
    {loading && <div className="absolute top-0 bg-white flex justify-center items-center w-[100vw] h-[100vh] opacity-40">
      <span className="spinner"></span>
    </div>
    }
    {ingredients.length === 0 ? (
      emptyIngredientsMessage
    ): (
      <div className="px-3">
        <h1 className="font-extrabold text-2xl mt-5">INGREDIENTS:</h1>
        <ul className="list-disc pl-5 space-y-2 mt-2 text-lg">
          {IngredientList}
        </ul>
        {ingredients.length >= 3 && (
          <div className="bg-gray-300 rounded px-4 py-3 flex justify-between items-center mt-28">
            <p className="w-1/2">
              Looks like you have enough ingredients. Are you ready to get a recipe?
            </p>
            <button
              className="rounded bg-amber-500 text-white p-3 w-1/3"
              onClick={fetchRecipe}
              disabled={loading}
              > Get Recipe
            </button>
          </div>
        )}
        {recipe && <Recipe recipes={recipe} />}
      </div>
    )}
  </>
);
};

export default Ingredients;