import { Router } from "express";
import { register, login, logout, refresh } from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/refresh", refresh);
authRouter.post("/logout", isAuthenticated, logout);

export default authRouter;