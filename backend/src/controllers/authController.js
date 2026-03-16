import bcrypt from "bcrypt";
import * as service from "../services/authService.js";
import { generateTokenPair } from "../services/tokenService.js";

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await service.getUserByEmail(email);

      if(!user) {
        return res.status(404).json({ status: "error", message: "Ne postoji korisnik!" });
      }

      const doesPasswordsMatch = bcrypt.compare(password, user.password);

      if(!doesPasswordsMatch) {
        return res.status(400).json({ status: "error", message: "Uneta lozinka je pogrešna!" });
      }

      const userData = {
        id: user.id,
        email: user.email,
        fullName: user.first_name + " " + user.last_name,
        role: user.role
      };

      const { accessToken, refreshToken } = generateTokenPair(userData);

      res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 
      });

      return res.status(200).json({ status: "success", user: userData, token: accessToken });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};
export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const user = await service.createUser(email, password, firstName, lastName);

        const userData = {
        id: user.id,
        email: user.email,
        fullName: user.first_name + " " + user.last_name,
        role: user.role
        };

        const { accessToken, refreshToken } = generateTokenPair(userData);

        res.cookie("refreshToken", refreshToken, { 
              httpOnly: true, 
              sameSite: 'Strict',
              maxAge: 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({ status: "success", user: userData, token: accessToken });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if(!refreshToken) {
            return res.status(200).json({ user: null, accessToken: null });
        }

        const { accessToken, userData } = await service.verifyToken(refreshToken);

        return res.status(200).json({ status: "success", user: userData, token: accessToken });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};