import { Router } from "express";
import { getAllTopics, createTopic, editTopic, deleteTopic } from "../controllers/topic.controller.js";
import { TEACHER } from "../constants/roles.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const topicRouter = Router();

topicRouter.get("/", getAllTopics);
topicRouter.use(isAuthorized(TEACHER));
topicRouter.post("/", createTopic);
topicRouter.put("/:id", editTopic);
topicRouter.delete("/:id", deleteTopic);

export default topicRouter;