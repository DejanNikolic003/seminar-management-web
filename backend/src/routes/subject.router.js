import { Router } from "express";
import isAuthorized from "../middlewares/isAuthorized.js";
import { createSubject, deleteSubject, editSubject, getAllSubjects } from "../controllers/subject.controller.js";
import { TEACHER } from "../constants/roles.js";

const subjectRouter = Router();

subjectRouter.get("/", getAllSubjects);
subjectRouter.use(isAuthorized(TEACHER));
subjectRouter.post("/", createSubject);
subjectRouter.put("/:id", editSubject);
subjectRouter.delete("/:id", deleteSubject);
export default subjectRouter;