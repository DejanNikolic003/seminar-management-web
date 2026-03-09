import { Router } from "express";
import * as controller from "../controllers/topicController.js";
import isAuthorized from "../middleware/isAuthorized.js";
import { PROFESSOR } from "../constants/roles.js";

const topicRouter = Router();

topicRouter.post("/", isAuthorized(PROFESSOR), controller.createTopic);
topicRouter.post("/:id", controller.reserveTopic);
topicRouter.get("/", controller.getAllTopics);
topicRouter.get("/subject/:id", controller.getTopicsBySubject);

export default topicRouter;

