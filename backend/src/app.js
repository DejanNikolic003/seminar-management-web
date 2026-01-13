import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma.js";
import { STATUS_CODE_OK } from "./constants/statusCodes.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/status", (req, res) => {
    res.status(STATUS_CODE_OK).json({ message: "OK" });
});

export default app;