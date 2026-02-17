import { Router } from "express";
import multer from "multer";
import { deleteSeminar, createSeminar, editSeminar, getAllSeminars, getSeminarCountByStatus } from "../controllers/seminar.controller.js";

const seminarRouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/seminars/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);   
    }
});

const upload = multer({ storage: storage });

seminarRouter.get("/", getAllSeminars);
seminarRouter.get("/count", getSeminarCountByStatus);
seminarRouter.post("/", upload.single("file"), createSeminar);
seminarRouter.put("/:id", upload.single("file"), editSeminar);
seminarRouter.delete("/:id", deleteSeminar);

export default seminarRouter;