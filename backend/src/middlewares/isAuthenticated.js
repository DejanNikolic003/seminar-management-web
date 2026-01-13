import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import * as STATUS from "../constants/statusCodes.js";


const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if(!authHeader) return res.status(STATUS.UNAUTHORIZED).json({ status: "error", message: "Authorization header is missing!" });
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const result = await prisma.user.findFirst({ where: { id: decoded._id } });
        
        req.user = {
            id: result.id,
            email: result.email,
            role: result.role
        }
        
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export default isAuthenticated;