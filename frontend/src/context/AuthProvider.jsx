import { createContext, useState, useEffect } from "react";
import axios, { axiosPrivate } from "../api/api.js";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        accessToken: null,
    });
    const [loading, setLoading] = useState(true);

    const hasRole = (role) => {
        return auth?.user?.role === role;
    };

    const login = async (data) => {
        try {
            const { data: response } = await axios.post("/auth/login", data);

            setAuth({
                user: response.user,
                accessToken: response.token,
            });
            console.log(response);
            return { status: response.status, message: response.message };
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message || "Došlo je do greške prilikom prijave!";
            throw new Error(message);
        }
    };

    const register = async (data) => {
        try {
            const { data: response } = await axios.post("/auth/register", data);

            setAuth({
                user: response.user,
                accessToken: response.token,
            });

            return { status: response.status, message: response.message };
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom registracije!";
            throw new Error(message);
        }
    };

    const logout = async () => {
        try {
            const { data: response } = await axiosPrivate.post("/auth/logout");
            
            setAuth({
                user: null,
                accessToken: null,
            });

            return { status: response.status, message: response.message };
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message || "Došlo je do greške prilikom odjave!";
            throw new Error(message);
        }
    };

    const refresh = async () => {
        try {
            const { data: response } = await axios.get("/auth/refresh", {
                withCredentials: true,
            });
            setAuth({
                user: response.user,
                accessToken: response.token,
            });
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom refresha tokena!";
            throw new Error(message);
        }
    };

    useEffect(() => {
        const refreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                setAuth({
                    user: null,
                    accessToken: null,
                });
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
