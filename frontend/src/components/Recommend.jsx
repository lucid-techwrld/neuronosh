import { useNavigate } from "react-router-dom";
import recipeImg from "../assets/recipe.png";

const Recommend = ({ recommend }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-4">
      {recommend.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(`/recipe/${item.name}`)}
          className="relative p-1 rounded-md bg-[linear-gradient(270deg,_#fdba74,_#fde68a,_#fca5a5)] bg-[length:400%_400%] animate-gradient-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="bg-white rounded-md w-full h-full pb-4 flex flex-col">
            <div className="w-full h-52 overflow-hidden rounded-t-md">
              <img
                src={recipeImg}
                alt="recipe-image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-2 pt-3 pb-2 flex-1 flex flex-col">
              <p className="font-bold text-xl lg:text-2xl md:text-xl mt-1 mb-1">
                {item.name}
              </p>
              <p className="text-sm lg:text-base leading-relaxed flex-1">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommend;
