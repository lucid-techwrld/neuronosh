import logo from "../assets/neuronosh logo.png";
import profile from "../assets/undraw_male-avatar_zkzx.svg";
import { HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "./UserContext";

const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { isLoggedIn, logout, user } = useUser();

  return (
    <>
      <header className="w-full h-18 flex justify-between px-4 py-2 items-center fixed top-0 z-50 bg-white/10 backdrop-blur-3xl">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={logo}
            alt="chef-claude-icon"
            className="w-[60px] h-[60px]"
          />
        </button>
        <h2 className="font-knewave text-2xl lg:text-3xl">NeuroNosh</h2>
        <div className="flex justify-center items-center gap-4 md:gap-5 lg:gap-10">
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => navigate("/saved")}
              className="flex justify-center items-center gap-2 text-black hover:bg-black hover:text-white h-full border-2 border-black rounded-md p-2"
            >
              <HeartIcon className="text-3xl" />
            </button>
            <span className="text-[0.7em]">Saved</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full p-[0.1rem] border-2 border-gray-400">
            <img
              src={user?.profile || profile}
              alt="neuronoshicon"
              className="w-full h-full object-cover rounded-full"
              onClick={() => {
                setMenu(!menu);
              }}
            />
          </div>
          <div
            className={`absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 transition-transform ${
              menu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <ul className="space-y-2">
              <li
                className="cursor-pointer hover:text-orange-500"
                onClick={() => {
                  navigate("/saved");
                }}
              >
                Saves
              </li>
              <li
                className="cursor-pointer hover:text-orange-500"
                onClick={() => {
                  isLoggedIn ? logout() : navigate("/auth");
                }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
