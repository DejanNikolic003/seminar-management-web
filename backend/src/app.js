import express from "express";
import isAuthenticated from "./middleware/isAuthenticated.js";
import authRouter from "./routes/authRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import topicRouter from "./routes/topicRoutes.js";
import seminarRouter from "./routes/seminarRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use(isAuthenticated);
app.use("/api/subjects", subjectRouter);
app.use("/api/topics", topicRouter);
app.use("/api/seminars", seminarRouter);
export default app;