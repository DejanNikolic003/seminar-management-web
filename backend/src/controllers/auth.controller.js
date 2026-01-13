import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import * as STATUS from "../constants/statusCodes.js";
import { generateToken } from "../utils/token.js";
import { REFRESH_TOKEN } from "../constants/token.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(await !doesUserExists(email)) {
            return res.status(STATUS.CONFLICT).json({ status: "error", message: "Ovaj email ne postoji u bazi podataka!" });
        }

        const result = await prisma.user.findFirst({ where: { email } });
        const doesPasswordMatches = bcrypt.compare(password, result.password);

        if(!doesPasswordMatches) {
            return res.status(STATUS.FORBIDDEN).json({ status: "error", message: "Uneli ste pogrešnu lozinku!" });
        }

        const user = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            role: result.role
        }

        const accessToken = generateToken({  _id: user.id });
        const refreshToken = generateToken({  _id: user.id }, REFRESH_TOKEN);         
       
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            secure: false,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste ulogovali!", user, accessToken });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        if(await doesUserExists(email)) {
            return res.status(STATUS.CONFLICT).json({ status: "error", message: "Ovaj email već postoji u bazi podataka!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await prisma.user.create({ data: {
            firstName, lastName, email, password: hashedPassword
        } });

        const user = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            role: result.role
        }

        const accessToken = generateToken({  _id: user.id });
        const refreshToken = generateToken({  _id: user.id }, REFRESH_TOKEN);         
       
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            secure: false,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste registrovali!", user, accessToken });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

const doesUserExists = async (email) => {
    try {
        const count = await prisma.user.count({ where: { email } });
        console.log(count > 0);
        return count > 0;
    } catch (error) {
        console.log(error);
    }
};