import image from "../assets/thermopro-wAkmA9I54dY-unsplash.jpg";
import illus from "../assets/undraw_chef_yoa7.svg";
import google from "../assets/Google__G__logo.svg.png";
import icloud from "../assets/apple-logo.png";
import { Phone, Mail, Loader } from "lucide-react";
import { useState } from "react";

const SiginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex w-full h-screen items-center">
      <div className="hidden lg:block lg:w-1/2 h-full border-2 relative">
        <img src={image} alt="image" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-10">
          <h1 className="text-white text-3xl font-bold text-center">
            What’s in your fridge? What can you make with it? Let’s find out —
            together.
          </h1>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 h-full flex flex-col justify-center items-center">
        <img src={illus} alt="illustrator" className="w-32 h-32" />
        <form className="w-full px-5 lg:w-[80%] md:w-[80%] h-auto space-y-3 flex flex-col">
          <p className="text-center font-bold text-2xl">Welcome</p>
          <div className="relative">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full h-10 outline-none  border-2 border-black p-5 pr-10"
            />
            <Mail className="absolute right-3 top-3 text-gray-500" />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-green-600 hover:bg-green-400 text-white"
          >
            {" "}
            Continue with Email
          </button>
          <p className="text-center">
            or <br />
            Sign in with
          </p>
          <button
            onClick={(e) => handleGoogleLogin(e)}
            disabled={loading}
            className={`border-2 border-black p-3 font-bold hover:bg-black hover:text-white flex gap-2 justify-center items-center`}
          >
            {loading ? (
              <Loader className="w-7 h-7 animate-spin" />
            ) : (
              <>
                <img src={google} alt="google" className="w-5 h-5" />
                <span>Google</span>
              </>
            )}
          </button>
          <button className="group border-2 border-black p-3 font-bold hover:bg-black hover:text-white flex gap-2 justify-center items-center transition-colors">
            <img
              src={icloud}
              alt="google"
              className="w-5 h-5 filter group-hover:invert transition duration-300"
            />
            iCloud
          </button>
          <button className="border-2 border-black p-3 font-bold hover:bg-black hover:text-white flex gap-2 justify-center items-center">
            <Phone className="w-6 h-6" /> Telephone
          </button>
        </form>
        <p className="text-[0.7em] italic font-semibold">NeuroNosh</p>
      </div>
    </div>
  );
};

export default SiginPage;
