import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/auth/user`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data.message);
      console.log(res.data.user);
      setUser(res.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Fetch User Error", error.res?.data.message || error.message);
    }
  };

  const login = async (email, password) => {
    try {
      console.log(email);
      console.log("login....");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/auth/email`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res.data.message);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong, try again.";

      console.log("Login Error:", message);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/auth/logout`
      );
      if (res.data?.success) {
        setUser(null);
        setIsLoggedIn(false);
        console.log(res.data);
      }
    } catch (error) {
      console.log("Logout Error", error.res?.data || error.messge);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        isLoggedIn,
        setIsLoggedIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
