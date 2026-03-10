import { Router } from "express";
import * as controller from "../controllers/enrollmentController.js";
import isAuthorized from "../middleware/isAuthorized.js";
import { PROFESSOR } from "../constants/roles.js";

const enrollmentRouter = Router();

enrollmentRouter.post("/", isAuthorized(PROFESSOR), controller.createEnrollment);
enrollmentRouter.get("/:userId", controller.getUserEnrollments);

export default enrollmentRouter;

