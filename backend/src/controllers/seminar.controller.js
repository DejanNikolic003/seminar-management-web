import { prisma } from "../lib/prisma.js";
import * as STATUS from "../constants/statusCodes.js";
import { unlink } from "fs/promises";
import { join } from "path";
import { STUDENT, TEACHER } from "../constants/roles.js";

export const getAllSeminars = async (req, res) => {
    try {
        const { subjectId } = req.query;
        
        if (!subjectId) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Predmet ID nedostaje!" 
            });
        }
        
        const results = await prisma.seminar.findMany({ 
            where: { subjectId: Number(subjectId) }, 
            include: { 
                student: { 
                    select: { id: true, firstName: true, lastName: true } 
                } 
            } 
        });

        res.status(STATUS.OK).json({ status: "success", data: results });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const createSeminar = async (req, res) => {
    try {
        const { title, description, subjectId, topicId } = req.body;
        const studentId = req.user.id;

        if (!req.file) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Fajl je obavezan!" 
            });
        }

        if (!title || !subjectId) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Naslov i ID predmeta su obavezni!" 
            });
        }

        const subject = await prisma.subject.findUnique({ 
            where: { id: Number(subjectId) } 
        });

        if (!subject) {
            return res.status(STATUS.NOT_FOUND).json({ 
                status: "error", 
                message: "Predmet ne postoji!" 
            });
        }


        if (topicId) {
            const topic = await prisma.topic.findUnique({ 
                where: { id: Number(topicId) } 
            });

            if (!topic) {
                return res.status(STATUS.NOT_FOUND).json({ 
                    status: "error", 
                    message: "Tema ne postoji!" 
                });
            }

   
            if (topic.subjectId !== Number(subjectId)) {
                return res.status(STATUS.BAD_REQUEST).json({ 
                    status: "error", 
                    message: "Tema ne pripada izabranom predmetu!" 
                });
            }
        }

        const seminar = await prisma.seminar.create({
            data: {
                fileName: req.file.filename,
                title,
                description: description || null,
                studentId,
                subjectId: Number(subjectId),
                topicId: topicId ? Number(topicId) : null,
            },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true }
                },
                subject: {
                    select: { id: true, name: true, code: true }
                },
                topic: {
                    select: { id: true, title: true }
                }
            }
        });

        res.status(STATUS.OK).json({ 
            status: "success", 
            message: "Uspešno ste dodali seminar!", 
            data: seminar 
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const editSeminar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, description, subjectId, topicId } = req.body;
        const userId = req.user.id;
        const userRole = req.user.role;


        const existingSeminar = await prisma.seminar.findUnique({
            where: { id },
            include: {
                student: {
                    select: { id: true }
                },
                subject: {
                    select: { id: true, teacherId: true }
                }
            }
        });

        if (!existingSeminar) {
            return res.status(STATUS.NOT_FOUND).json({ 
                status: "error", 
                message: "Seminar ne postoji!" 
            });
        }

        if (userRole === STUDENT) {
            if (existingSeminar.student.id !== userId) {
                return res.status(STATUS.FORBIDDEN).json({ 
                    status: "error", 
                    message: "Nemate dozvolu da menjate ovaj seminar!" 
                });
            }
            
            if (existingSeminar.status !== "PENDING") {
                return res.status(STATUS.FORBIDDEN).json({ 
                    status: "error", 
                    message: "Možete menjati samo seminare sa statusom PENDING!" 
                });
            }
        } else if (userRole === TEACHER) {
            if (existingSeminar.subject.teacherId !== userId) {
                return res.status(STATUS.FORBIDDEN).json({ 
                    status: "error", 
                    message: "Nemate dozvolu da menjate ovaj seminar!" 
                });
            }
        }


        if (title !== undefined && !title) {
            return res.status(STATUS.BAD_REQUEST).json({ 
                status: "error", 
                message: "Naslov ne može biti prazan!" 
            });
        }

        if (subjectId) {
            const subject = await prisma.subject.findUnique({ 
                where: { id: Number(subjectId) } 
            });

            if (!subject) {
                return res.status(STATUS.NOT_FOUND).json({ 
                    status: "error", 
                    message: "Predmet ne postoji!" 
                });
            }
        }

        if (topicId) {
            const topic = await prisma.topic.findUnique({ 
                where: { id: Number(topicId) } 
            });

            if (!topic) {
                return res.status(STATUS.NOT_FOUND).json({ 
                    status: "error", 
                    message: "Tema ne postoji!" 
                });
            }

            const finalSubjectId = subjectId ? Number(subjectId) : existingSeminar.subjectId;
            
          
            if (topic.subjectId !== finalSubjectId) {
                return res.status(STATUS.BAD_REQUEST).json({ 
                    status: "error", 
                    message: "Tema ne pripada izabranom predmetu!" 
                });
            }
        }

        
        let fileName = existingSeminar.fileName;
        if (req.file) {
          
            try {
                const oldFilePath = join(process.cwd(), "uploads", "seminars", existingSeminar.fileName);
                await unlink(oldFilePath);
            } catch (error) {
              
            }
            
            fileName = req.file.filename;
        }

        const updatedSeminar = await prisma.seminar.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description !== undefined && { description: description || null }),
                ...(subjectId && { subjectId: Number(subjectId) }),
                ...(topicId !== undefined && { topicId: topicId ? Number(topicId) : null }),
                ...(req.file && { fileName }),
            },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true }
                },
                subject: {
                    select: { id: true, name: true, code: true }
                },
                topic: {
                    select: { id: true, title: true }
                }
            }
        });

        res.status(STATUS.OK).json({ 
            status: "success", 
            message: "Uspešno ste izmenili seminar!", 
            data: updatedSeminar 
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const deleteSeminar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const userRole = req.user.role;

        const seminar = await prisma.seminar.findUnique({
            where: { id },
            include: {
                student: {
                    select: { id: true }
                },
                subject: {
                    select: { id: true, teacherId: true }
                }
            }
        });

        if (!seminar) {
            return res.status(STATUS.NOT_FOUND).json({ 
                status: "error", 
                message: "Seminar ne postoji!" 
            });
        }


        if (userRole === STUDENT) {
            if (seminar.student.id !== userId) {
                return res.status(STATUS.FORBIDDEN).json({ 
                    status: "error", 
                    message: "Nemate dozvolu da obrišete ovaj seminar!" 
                });
            }
            
            if (seminar.status !== "PENDING") {
                return res.status(STATUS.FORBIDDEN).json({ 
                    status: "error", 
                    message: "Možete obrisati samo seminare sa statusom PENDING!" 
                });
            }
        } else if (userRole === TEACHER) {
            if (seminar.subject.teacherId !== userId) {
                return res.status(STATUS.FORBIDDEN).json({ 
                    status: "error", 
                    message: "Nemate dozvolu da obrišete ovaj seminar!" 
                });
            }
        }

 
        try {
            const filePath = join(process.cwd(), "uploads", "seminars", seminar.fileName);
            await unlink(filePath);
        } catch (error) {
   
        }


        await prisma.seminar.delete({ where: { id } });

        res.status(STATUS.OK).json({ 
            status: "success", 
            message: "Uspešno ste obrisali seminar!" 
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};    

export const getSeminarCountByStatus = async (req, res) => {
    try {
    const counts = await prisma.seminar.groupBy({by: ["status"], _count: { status: true, }, });
    const result = counts.map((item) => ({ type: item.status, count: item._count.status }) );

    res.status(STATUS.OK).json({ status: "success", data: result });
    } catch (error) {
       res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message }); 
    }
}