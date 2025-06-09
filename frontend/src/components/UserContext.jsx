import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/auth/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUser(res.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      console.log("Error Fetching User:", message);
    }
  };

  const login = async (email, password) => {
    try {
      if (!navigator.onLine) {
        console.log(navigator);
        toast.error("You're offline. Check your internet connection.");
        return;
      }

      const res = await axios.post(
        `/api/auth/email`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setIsLoggedIn(true);
      if (!res.data.isVerified) {
        return { notVerified: true };
      } else {
        return { success: true };
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      console.log("Login Error:", message);
      toast.error(message);
    }
  };

  const logout = async () => {
    try {
      if (!navigator.onLine) {
        toast.error("You're offline. Check your internet connection.");
        return;
      }

      const res = await axios.get(`/api/auth/logout`);
      if (res.data?.success) {
        setUser(null);
        setIsLoggedIn(false);
        toast.success(res.data.message || "Logged out successfully!");
      }
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      console.log("Logout Error:", message);
      toast.error(message);
      return { error: message };
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
