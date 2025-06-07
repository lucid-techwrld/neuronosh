import image from "../assets/thermopro-wAkmA9I54dY-unsplash.jpg";
import illus from "../assets/undraw_chef_yoa7.svg";
import google from "../assets/Google__G__logo.svg.png";
import icloud from "../assets/apple-logo.png";
import { Phone, Mail, Loader, EyeIcon, EyeOffIcon, Eye } from "lucide-react";
import { useState } from "react";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const SiginPage = () => {
  const navigate = useNavigate();
  const [googleLoad, setGooleLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;
      const res = await login(email, password);
      if (res?.success) {
        navigate("/");
      } else if (res?.notVerified) {
        navigate(`/verify/${email}`);
      } else if (res?.error) {
        setError(res.error);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      event.target.reset();
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setGooleLoad(true);
    window.location.href = `${
      import.meta.env.VITE_BASE_API_URL
    }/api/auth/google`;
  };

  return (
    <div className="flex w-full h-screen items-center">
      <div className="hidden md:block md:w-1/2 lg:block lg:w-1/2 h-full border-2 relative">
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
        <div className="w-full px-5 lg:w-[80%] md:w-[80%] h-auto space-y-3 flex flex-col">
          <p className="text-center font-bold text-2xl">Welcome</p>
          <form onSubmit={(event) => handleLogin(event)}>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="username"
                required
                className="w-full h-10 outline-none  border-2 border-black p-5 pr-10"
              />
              <Mail className="absolute right-3 top-3 text-gray-500" />
            </div>

            <div className="relative mt-5">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                className="w-full h-10 outline-none  border-2 border-black p-5 pr-10"
              />

              <p className="text-red-500 text-sm">{error}</p>
              {/* error line */}
              <button
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-10 ${
                loading ? "bg-green-200" : "bg-green-600 hover:bg-green-400"
              }  text-white mt-4 flex justify-center items-center`}
            >
              {loading ? (
                <Loader className="w-7 h-7 animate-spin text-black" />
              ) : (
                <span>Continue with Email</span>
              )}
            </button>
          </form>
          <p className="text-center">
            or <br />
            Sign in with
          </p>
          <button
            onClick={(e) => handleGoogleLogin(e)}
            disabled={googleLoad}
            className={`border-2 border-black p-3 font-bold hover:bg-black hover:text-white flex gap-2 justify-center items-center`}
          >
            {googleLoad ? (
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
        </div>
        <p className="text-[0.7em] italic font-semibold">NeuroNosh</p>
      </div>
    </div>
  );
};

export default SiginPage;
