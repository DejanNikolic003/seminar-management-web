import jwt from "jsonwebtoken";
import { REFRESH_TOKEN, ACCESS_TOKEN, REFRESH_TOKEN_EXPIRATION, ACCESS_TOKEN_EXPIRATION } from "../constants/token.js";

const generateAccessToken = (data) => { return jwt.sign(data, ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_EXPIRATION }) };
const generateRefreshToken = (data) => { return jwt.sign(data, REFRESH_TOKEN, { expiresIn: REFRESH_TOKEN_EXPIRATION }) };
const generateTokenPair = (data) => {
    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    return { accessToken, refreshToken };
};

export { generateAccessToken, generateRefreshToken, generateTokenPair };