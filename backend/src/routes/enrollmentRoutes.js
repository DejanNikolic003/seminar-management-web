import { Router } from "express";
import * as controller from "../controllers/enrollmentController.js";
import isAuthorized from "../middleware/isAuthorized.js";
import { ADMIN, PROFESSOR } from "../constants/roles.js";

const enrollmentRouter = Router();

enrollmentRouter.post("/", isAuthorized([PROFESSOR, ADMIN]), controller.createEnrollment);
enrollmentRouter.get("/", controller.getUserEnrollments);

export default enrollmentRouter;

