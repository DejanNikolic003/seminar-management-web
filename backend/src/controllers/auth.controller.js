import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import * as STATUS from "../constants/statusCodes.js";
import { generateToken } from "../utils/token.js";
import { REFRESH_TOKEN } from "../constants/token.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Email i lozinka su obavezni!" 
            });
        }
        
        if(!await doesUserExists(email)) {
            return res.status(STATUS.NOT_FOUND).json({ 
                status: "error", 
                message: "Ovaj email ne postoji u bazi podataka!" 
            });
        }

        const result = await prisma.user.findFirst({ where: { email } });
        const doesPasswordMatches = await bcrypt.compare(password, result.password);

        if(!doesPasswordMatches) {
            return res.status(STATUS.UNAUTHORIZED).json({ 
                status: "error", 
                message: "Uneli ste pogrešnu lozinku!" 
            });
        }

        const user = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            role: result.role
        };

        const accessToken = generateToken({ _id: result.id });
        const refreshToken = generateToken({ _id: result.id }, REFRESH_TOKEN);         
       
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(STATUS.OK).json({ 
            status: "success", 
            message: "Uspešno ste ulogovali!", 
            data: { user, accessToken } 
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Sva polja su obavezna!" 
            });
        }
        
        if(await doesUserExists(email)) {
            return res.status(STATUS.CONFLICT).json({ 
                status: "error", 
                message: "Ovaj email već postoji u bazi podataka!" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await prisma.user.create({ 
            data: {
                firstName, 
                lastName, 
                email, 
                password: hashedPassword
            } 
        });

        const user = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            role: result.role
        };

        const accessToken = generateToken({ _id: result.id });
        const refreshToken = generateToken({ _id: result.id }, REFRESH_TOKEN);         
       
        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(STATUS.OK).json({ 
            status: "success", 
            message: "Uspešno ste registrovali!", 
            data: { user, accessToken } 
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", { 
            httpOnly: true, 
            sameSite: 'Strict',
        });

        res.status(STATUS.OK).json({ 
            status: "success", 
            message: "Uspešno ste se odjavili!" 
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if(!refreshToken) {
            return res.status(STATUS.OK).json({ user: null, accessToken: null });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const result = await prisma.user.findFirst({ where: { id: decoded._id } });
        const accessToken = generateToken({ _id: decoded._id });

        const user = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            role: result.role
        };

        res.status(STATUS.OK).json({ 
            status: "success", 
            data: { user, accessToken } 
        });
    } catch (error) {
        res.status(STATUS.FORBIDDEN).json({ status: "error", message: "Refresh token nije validan!" });
    }
};



const doesUserExists = async (email) => {
    try {
        const count = await prisma.user.count({ where: { email } });
        return count > 0;
    } catch (error) {
        throw error;
    }
};