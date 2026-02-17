import { Router } from "express";
import isAuthorized from "../middlewares/isAuthorized.js";
import { addUserToSubject, createSubject, deleteSubject, editSubject, getAllSubjects, getUserSubjects } from "../controllers/subject.controller.js";
import { TEACHER } from "../constants/roles.js";

const subjectRouter = Router();

// subjectRouter.get("/", getAllSubjects);
subjectRouter.get("/",  getUserSubjects);
subjectRouter.use(isAuthorized(TEACHER));
subjectRouter.post("/", createSubject);
subjectRouter.post("/:subjectId/users", addUserToSubject);
subjectRouter.put("/:id", editSubject);
subjectRouter.delete("/:id", deleteSubject);
export default subjectRouter;