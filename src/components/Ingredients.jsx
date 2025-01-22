import {
  useState
} from 'react'

import image from '../assets/image.png'

const Ingredients = ({
  ingredients
}) => {
  console.log(ingredients)
  const IngredientList = ingredients.map((item, index) => <li key={index}>{item}</li>);

  const img = (
    <div className="flex flex-col justify-center items-center">
      <img src={image} alt="empty Ingredients" className="w-[300px] h-[250px] mt-24" />
    <marquee scrollamount="5" className="text-center">
      Add atleast 3 ingredients to get a recipe...
    </marquee>
  </div>
)
return (
  <>
    {ingredients.length === 0 ? img: <div className="px-3">
      <h1 className="font-extrabold text-2xl mt-5">INGREDIENTS: </h1>
      <ul className="list-disc pl-5 space-y-2 mt-2 text-lg">
        {IngredientList}
      </ul>
      {ingredients.length >= 3 ?
      <div className="bg-gray-300 rounded px-4 py-3 flex justify-between items-center mt-28">
        <p className="w-1/2">
          Looks like you have enough ingredients, are you ready to get recipe?
        </p>
        <button className="rounded bg-amber-500 text-white p-3 w-1/3">Get Recipe</button>
      </div>: null }
    </div>
    }
  </>
)
}

export default Ingredients