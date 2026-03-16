import { Router } from "express";
import * as controller from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", controller.login);
authRouter.post("/register", controller.register);
authRouter.get("/refresh", controller.refresh);

export default authRouter;