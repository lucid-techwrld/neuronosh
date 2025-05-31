import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSaves } from "./SaveContext";

const SavedCard = ({ recipe }) => {
  const { handleDelete } = useSaves();
  const navigate = useNavigate();
  return (
    <div>
      {recipe.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(`/recipe/${item.name}`)}
          className="bg-white shadow-md rounded-lg p-4 mb-4 "
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-orange-400">
              {item.name}
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.name);
              }}
              className="text-red-500 hover:text-red-700 border-2 border-red-500 rounded-md p-1"
            >
              <Delete className="w-full h-full" />
            </button>
          </div>
          <p className="text-gray-600 hover:text-red-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedCard;
