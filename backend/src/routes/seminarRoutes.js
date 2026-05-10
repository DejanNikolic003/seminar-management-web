import { Router } from "express";
import * as controller from "../controllers/seminarController.js";
import isAuthorized from "../middleware/isAuthorized.js";
import { ADMIN, PROFESSOR, STUDENT } from "../constants/roles.js";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("LEFUT");
        cb(null, "uploads/seminars/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        console.log("LEFUT");
        cb(null, uniqueSuffix + '-' + file.originalname);   
    }
});

const upload = multer({ storage: storage });

const seminarRouter = Router();

seminarRouter.post("/", isAuthorized(STUDENT), controller.createSeminar);
seminarRouter.get("/", controller.getSeminars);
seminarRouter.get("/topic/:topicId", controller.getSeminarByTopic);
seminarRouter.post("/topic/:topicId/upload", isAuthorized(STUDENT), controller.uploadSeminarPaper);
seminarRouter.put("/:id/status", isAuthorized([PROFESSOR, ADMIN]), controller.updateSeminarStatus);

export default seminarRouter;

