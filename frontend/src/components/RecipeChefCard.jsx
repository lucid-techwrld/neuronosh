import { useEffect, useState } from "react";
import chefOne from "../assets/chef1.jpg";
import chefTwo from "../assets/chef2.jpeg";
import chefThree from "../assets/chef3.jpg";
import chefFour from "../assets/chef4.jpg";
import chefFive from "../assets/chef5.jpg";

const RecipeChefCard = ({ name, desc }) => {
  const [showChef, setShowChef] = useState();

  const decsription = desc.split("");
  const text = decsription.slice(0, 60);
  const shortenDesc = text.join("");

  const chefs = [chefOne, chefTwo, chefThree, chefFour, chefFive];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chefs.length);
    console.log(randomIndex);
    setShowChef(chefs[randomIndex]);
  }, []);

  return (
    <div className="w-full h-60 lg:h-[600px] mg:h-[500px] relative flex justify-center mb-10">
      <div className="w-full h-[90%] lg:h-[90%]">
        <img src={showChef} alt="chef" className="w-full h-full object-cover" />
      </div>
      <div className="absolute -bottom-2 w-[90%] h-auto rounded-lg bg-orange-400 text-center p-3">
        <h1 className="text-xl lg:text-3xl md:text-2xl text-white font-bold">
          {name}
        </h1>
        <p className="text-md lg:text-2xl md:text-xl hidden lg:block md:block">
          {desc}
        </p>
        <p className="text-md lg:text-2xl md:text-xl lg:hidden md:hidden">
          {shortenDesc + "..."}
        </p>
      </div>
    </div>
  );
};

export default RecipeChefCard;
