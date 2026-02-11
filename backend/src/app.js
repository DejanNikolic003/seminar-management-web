import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";
import subjectRouter from "./routes/subject.router.js";
import topicRouter from "./routes/topic.router.js";
import seminarRouter from "./routes/seminar.router.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/status", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

// AUTH ROUTES
app.use("/api/auth", authRouter);

// PROTECTED ROUTES
app.use(isAuthenticated);

// SUBJECT ROUTES
app.use("/api/subjects", subjectRouter);

// TOPIC ROUTES
app.use("/api/topics", topicRouter);

// SEMINAR ROUTES
app.use("/api/seminars", seminarRouter);

export default app;