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

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refresh();

        setAuth({
          user: response.data.user,
          accessToken: response.data.accessToken,
        });
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
