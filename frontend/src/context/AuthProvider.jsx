import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { refresh } from "../api/auth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasRole = (role) => {
    return auth?.user?.role?.trim() === role.trim();
  };

  const login = async (data) => {
    try {
      const { data: response } = await axios.post("/auth/login", data);

      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });

      return { status: response.status, message: response.message };
    } catch (error) {
      const message =
        error.response?.message || "Došlo je do greške prilikom prijave!";
      throw new Error(message);
    }
  };

  const register = async (data) => {
    try {
      const { data: response } = await axios.post("/auth/register", data);

      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });

      return { status: response.status, message: response.message };
    } catch (error) {
      const message =
        error.response?.message || "Došlo je do greške prilikom registracije!";
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      const { data: response } = await axiosPrivate.post("/auth/logout");

      setAuth({});
      return { status: response.status, message: response.message };
    } catch (error) {
      const message =
        error.response?.message || "Došlo je do greške prilikom odjave!";
      throw new Error(message);
    }
  };

  const refresh = async () => {
    try {
      const { data: response } = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      const message =
        error.response?.message ||
        "Došlo je do greške prilikom refresha tokena!";
      throw new Error(message);
    }
  };

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refresh();
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        hasRole,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
