import { prisma } from "../config/prismaClient.js";
import bcrypt from "bcrypt";

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

export { createUser, getUserByEmail };