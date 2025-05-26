import { XCircle } from "lucide-react";

const IngredientList = ({ ingredients, removeIngredient }) => {
  console.log("ingredient list", ingredients);
  return (
    <div className="mt-5 flex flex-wrap gap-2 w-full justify-center">
      {ingredients.map((item, index) => (
        <div
          key={index}
          className="p-2 bg-gray-300 text-sm rounded-md flex justify-center items-center gap-2"
        >
          {item}
          <XCircle
            className="w-4 h-4 text-red-500"
            onClick={() => removeIngredient(item)}
          />
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
