import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as STATUS from "./constants/statusCodes.js";
import authRouter from "./routes/auth.router.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/status", (req, res) => {
    res.status(STATUS.OK).json({ message: "OK" });
});

// AUTH ROUTES
app.use("/api/auth", authRouter);

export default app;