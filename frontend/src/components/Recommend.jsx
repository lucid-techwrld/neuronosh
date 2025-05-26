import { useNavigate } from "react-router-dom";

const Recommend = ({ recommend }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
      {recommend.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(`/recipe/${item.name}`)}
          className="relative p-1 rounded-md bg-[linear-gradient(270deg,_#fdba74,_#fde68a,_#fca5a5)] bg-[length:400%_400%] animate-gradient-border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="bg-white rounded-md p-2 w-full h-full">
            <p className="font-bold text-xl">{item.name}</p>
            <p className="text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommend;
