import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import isAuthenticated from "./middleware/isAuthenticated.js";
import authRouter from "./routes/authRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import topicRouter from "./routes/topicRoutes.js";
import seminarRouter from "./routes/seminarRoutes.js";
import enrollmentRouter from "./routes/enrollmentRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());    
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRouter);
app.use(isAuthenticated);
app.use("/api/subjects", subjectRouter);
app.use("/api/topics", topicRouter);
app.use("/api/seminars", seminarRouter);
app.use("/api/enrollments", enrollmentRouter);
export default app;