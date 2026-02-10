import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import * as STATUS from "../constants/statusCodes.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader) {
            return res.status(STATUS.UNAUTHORIZED).json({ 
                status: "error", 
                message: "Authorization header is missing!" 
            });
        }
        
        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(STATUS.UNAUTHORIZED).json({ 
                status: "error", 
                message: "Token is missing!" 
            });
        }
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const result = await prisma.user.findFirst({ where: { id: decoded._id } });
        
        if (!result) {
            return res.status(STATUS.UNAUTHORIZED).json({ 
                status:  "error", 
                message:  "Korisnik ne postoji!" 
            });
        }
        
        req.user = {
            id: result.id,
            email: result.email,
            role: result.role
        };
        
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(STATUS.UNAUTHORIZED).json({ 
                status: "error", 
                message: "Invalid or expired token!" 
            });
        }
        
        return res.status(STATUS.INTERNAL_ERROR).json({ 
            status: "error", 
            message: error.message 
        });
    }
};

export default isAuthenticated;