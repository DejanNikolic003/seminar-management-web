import { prisma } from "../config/prismaClient.js";
import { PROFESSOR } from "../constants/roles.js";

import bcrypt from "bcrypt";
import {generateTokenPair} from "./tokenService.js";
import jwt from "jsonwebtoken";

const createUser = async (email, password, firstName, lastName) => {
    try {
        const exists = await doesUserExists(email);

        if(exists) {
            throw new Error("Već postoji korisnik sa ovim korisničkim imenom ili e-mail adresom.")
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                first_name: firstName,
                last_name: lastName,
                role: "STUDENT"
            }
        });

        return user;
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const exists = await doesUserExists(email);

        if(!exists) {
            throw new Error("Korisnik ne postoji!");
        }
        const user = await prisma.users.findUnique({ where: { email } });
        
        return user;
    } catch (error) {
        throw error;
    }
};

const doesUserExists = async (email) => {
  try {
    const user = await prisma.users.findFirst({
      where: { email },
      select: { id: true }
    });

    return !!user;
  } catch (error) {
    console.error("doesUserExists error:", error);
    throw error;
  }
}

const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await doesUserExistsById(decoded.id);

        if(!user) {
            throw new Error("Korisnik ne postoji!");
        }

        const userData = {
            id: user.id,
            email: user.email,
            fullName: user.first_name + " " + user.last_name,
            role: user.role
        };

        const { accessToken } = generateTokenPair(userData);

        return { accessToken, userData };
    } catch (error) {
        throw error;
    }
};

const doesUserExistsById = async (userId) => {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    return user || null;
};

const isProfessor = (user) => user?.role === PROFESSOR;

export { createUser, getUserByEmail, verifyToken, doesUserExistsById, isProfessor };
