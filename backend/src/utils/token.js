import { ACCESS_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from "../constants/token.js";
import jwt from "jsonwebtoken";
export const generateToken = (data, type = ACCESS_TOKEN) => {
    if(![ACCESS_TOKEN, REFRESH_TOKEN].includes(type)) {
        return;
    }

    const tokenSecretKey = type === ACCESS_TOKEN ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    const tokenExpiration = type === ACCESS_TOKEN ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION;

    const token = jwt.sign(data, tokenSecretKey, { expiresIn: tokenExpiration });

    return token;
};