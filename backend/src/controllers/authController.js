import * as service from "../services/authService.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await service.getUserByEmail(email);

      if(!user) {
        return res.status(404).json({ message: "Ne postoji korisnik!" });
      }

      const doesPasswordsMatch = bcrypt.compare(password, user.password);

      if(!doesPasswordsMatch) {
        return res.status(400).json({ message: "Uneta lozinka je pogrešna!" });
      }

      const returnUser = {
        id: user.id,
        email: user.email,
        fullName: user.first_name + " " + user.last_name,
        role: user.role
      };

      return res.status(200).json({ user: returnUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const user = await service.createUser(email, password, firstName, lastName);

        const returnUser = {
            id: user.id,
            email: user.email,
            fullName: user.first_name + " " + user.last_name,
            role: user.role
        };

        return res.status(200).json({ user: returnUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};