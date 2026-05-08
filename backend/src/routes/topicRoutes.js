import { Router } from "express";
import * as controller from "../controllers/topicController.js";
import isAuthorized from "../middleware/isAuthorized.js";
import { ADMIN, PROFESSOR, STUDENT } from "../constants/roles.js";

const topicRouter = Router();

topicRouter.post("/", isAuthorized([PROFESSOR, ADMIN]), controller.createTopic);
topicRouter.put("/:id", isAuthorized([PROFESSOR, ADMIN]), controller.updateTopic);
topicRouter.delete("/:id", isAuthorized([PROFESSOR, ADMIN]), controller.deleteTopic);
topicRouter.post("/:id/reserve", isAuthorized(STUDENT), controller.reserveTopic);
topicRouter.get("/", controller.getAllTopics);
topicRouter.get("/subject/:id", controller.getTopicsBySubject);

export default topicRouter;

