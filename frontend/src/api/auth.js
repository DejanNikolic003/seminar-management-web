import axios from "./axios";

export const login = async (data) => {
    try {
        const response = await axios.post("/auth/login", data);

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Došlo je do greške prilikom prijave!";
        throw new Error(message);
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post("/auth/register", data);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Došlo je do greške prilikom registracije!";
        throw new Error(message);
    }
};

export const refresh = async () => {
    try {
        const response = await axios.get("/auth/refresh", {
          withCredentials: true,
        });

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Došlo je do greške prilikom refresha tokena!";
        throw new Error(message);
    }
};
