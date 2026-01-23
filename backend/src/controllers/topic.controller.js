import { prisma } from "../lib/prisma.js";
import * as STATUS from "../constants/statusCodes.js";

export const getAllTopics = async (req, res) => {
    try {
        const result = await prisma.topic.findMany({ 
            include: { 
                subject: { 
                    select: { id: true, name: true } 
                } 
            } 
        });
            
        res.status(STATUS.OK).json({ status: "success", data: result });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const createTopic = async (req, res) => {
    try {
        const { title, description, subjectId } = req.body;

        if(!title || !subjectId) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Naslov i ID predmeta su obavezni!" 
            });
        }

        if(!await doesSubjectExists(subjectId)) {
            return res.status(STATUS.NOT_FOUND).json({ status: "error", message: "Predmet ne postoji!" });  
        }

        const result = await prisma.topic.create({ data: { title, description, subject: { connect: { id: subjectId } } } });

        res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste dodali novu temu!", data: result });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const editTopic = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, description, subjectId } = req.body;

        if(!title || !subjectId) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Naslov i ID predmeta su obavezni!" 
            });
        }

        if(!await doesTopicExists(id)) {
            return res.status(STATUS.NOT_FOUND).json({ status: "error", message: "Tema ne postoji!" });  
        }

        if(!await doesSubjectExists(subjectId)) {
            return res.status(STATUS.NOT_FOUND).json({ status: "error", message: "Predmet ne postoji!" });  
        }

        const editedTopic = await prisma.topic.update({
            where: { id },
            data: {
                title,
                description,
                subject: {
                    connect: { id: subjectId },
                },
            },
        });

        res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste izmenili temu!", data: editedTopic });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const deleteTopic = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if(!await doesTopicExists(id)) {
            return res.status(STATUS.NOT_FOUND).json({ status: "error", message: "Tema ne postoji!" });  
        }

         await prisma.topic.delete({ where: { id } });
    
        res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste obrisali temu!" });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

const doesSubjectExists = async (subjectId) => {
    try {
        const count = await prisma.subject.count({ where: { id: subjectId } });
        return count > 0;
    } catch (error) {
        throw error;
    }
};

const doesTopicExists = async (topicId) => {
    try {
        const count = await prisma.topic.count({ where: { id: topicId } });
        return count > 0;
    } catch (error) {
        throw error;
    }
};