import { useState } from "react";
import Ingredients from "./Ingredients";

const AddIngredient = () => {
  const [ingredient, setIngredient] = useState(["Chicken", "Potato", "Rice", "Coconut"]);
  const [newIngredient, setNewIngredient] = useState(""); 
  
  const handleInputChange = (event) => {
    setNewIngredient(event.target.value);
  };


  const addIngredient = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredientValue = formData.get("ingredient");

    if (newIngredientValue.trim() !== "") {
      setIngredient((prevIng) => [...prevIng, newIngredientValue]);
      setNewIngredient("");
    }
  };

  return (
    <div className="px-4 py-5">
      <form
        className="flex w-full justify-between items-center max-w-[500px] gap-3"
        onSubmit={addIngredient}
      >
        <input
          type="text"
          name="ingredient"
          placeholder="eg: water leaf...."
          value={newIngredient}
          onChange={handleInputChange}
          className="border-2 border-black rounded p-2 flex-grow focus:outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white rounded p-2 flex-grow"
        >
          + Add Ingredient
        </button>
      </form>
      <Ingredients ingredients={ingredient} />
    </div>
  );
};

export default AddIngredient;
