import { Router } from "express";
import * as controller from "../controllers/subjectController.js";

const subjectRouter = Router();

subjectRouter.post("/", controller.createSubject);
subjectRouter.get("/", controller.getSubjectsByProfessorId);
subjectRouter.get("/:id", controller.getSubjectById);

export default subjectRouter;