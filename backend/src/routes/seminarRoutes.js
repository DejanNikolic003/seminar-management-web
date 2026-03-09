import { Router } from "express";
import * as controller from "../controllers/seminarController.js";
import isAuthorized from "../middleware/isAuthorized.js";
import { PROFESSOR, STUDENT } from "../constants/roles.js";

const seminarRouter = Router();

seminarRouter.post("/", isAuthorized(STUDENT), controller.createSeminar);
seminarRouter.get("/", controller.getSeminars);
seminarRouter.put("/:id/status", isAuthorized(PROFESSOR), controller.updateSeminarStatus);

export default seminarRouter;

