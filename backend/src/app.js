import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as STATUS from "./constants/statusCodes.js";
import authRouter from "./routes/auth.router.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";
import isAuthorized from "./middlewares/isAuthorized.js";
import { TEACHER, STUDENT } from "./constants/roles.js";
import subjectRouter from "./routes/subject.router.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// AUTH ROUTES
app.use("/api/auth", authRouter);

// app.get("/api/status", isAuthenticated, isAuthorized(STUDENT), (req, res) => {
//     res.status(STATUS.OK).json({ message: "OK" });
// });

app.use(isAuthenticated);
app.use("/api/subjects", subjectRouter);

export default app;