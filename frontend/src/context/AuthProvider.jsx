import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { refresh } from "../api/auth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const hasRole = (role) => {
    return user?.role?.trim() === role.trim();
  };

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refresh();

        setUser({
          user: response.data.user,
          accessToken: response.data.accessToken,
        });
      } catch (error) {
        setUser({});
      }
    };
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
