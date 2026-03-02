import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../constants/token.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({  message: "Authorization header is missing!" });
        
        const token = authHeader.split(" ")[1];
        if (!token) return res.status(404).json({ message: "Token is missing!" });
        
        const decoded = jwt.verify(token, ACCESS_TOKEN);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError")
            return res.status(401).json({ message: "Invalid or expired token!" });
        
        return res.status(500).json({ message: error.message });
    }
};

export default isAuthenticated;