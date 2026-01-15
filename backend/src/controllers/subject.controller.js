import { prisma } from "../lib/prisma.js";
import * as STATUS from "../constants/statusCodes.js";
import { TEACHER } from "../constants/roles.js";

export const getAllSubjects = async (req, res) => {
    try {
       const result = await prisma.subject.findMany({ include: { teacher: { select: { id: true, firstName: true, lastName: true, email: true } } } });
        
       res.status(STATUS.OK).json({ status: "success", result });
    } catch (error) {
       res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const createSubject = async (req, res) => {
    try {
        const { name, code, teacherId } = req.body;

        if(!name || !code) {
            return res.status(STATUS.FORBIDDEN).json({
                status: "error",
                message: "Naziv i šifra su obavezni",
            });
        }

        if(!await doesSubjectCodeExist(code)) {
            return res.status(STATUS.FORBIDDEN).json({
                status: "error",
                message: "Predmet sa ovim kodom već postoji!",
            });
        }

        if (!await isUserTeacher(teacherId)) {
            return res.status(STATUS.FORBIDDEN).json({
                status: "error",
                message: "Korisnik ne postoji ili nije profesor!",
            });
        }

        const newSubject = await prisma.subject.create({ 
            data: {
                name,
                code,
                teacher: {
                    connect: { id: teacherId },
                }, 
            } 
        });

        res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste dodali novi predmet!", newSubject });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const editSubject = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, code, teacherId } = req.body;

        if(!await doesSubjectExist(id)) {
            return res.status(STATUS.NOT_FOUND).json({ status: "error", message: "Ne postoji predmet sa ovim ID-jem!" });
        }

        if (!await isUserTeacher(teacherId)) {
            return res.status(STATUS.FORBIDDEN).json({
                status: "error",
                message: "Korisnik ne postoji ili nije profesor!",
            });
        }

        if(!await doesSubjectCodeExist(code)) {
            return res.status(STATUS.FORBIDDEN).json({
                status: "error",
                message: "Predmet sa ovim kodom već postoji!",
            });
        }

        const updatedSubject = await prisma.subject.update({
            where: { id },
            data: {
                name,
                code,
                teacher: {
                    connect: { id: teacherId },
                },
            },
        });

        res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste izmenili predmet!", updatedSubject });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

export const deleteSubject = async (req, res) => {
    try { 
         const id = Number(req.params.id);

        if(!await doesSubjectExist(id)) {
            return res.status(STATUS.NOT_FOUND).json({ status: "error", message: "Ne postoji predmet sa ovim ID-jem!" });
        }

         await prisma.subject.delete({ where: { id } });

         res.status(STATUS.OK).json({ status: "success", message: "Uspešno ste obrisali predmet!" });
    } catch (error) {
        res.status(STATUS.INTERNAL_ERROR).json({ status: "error", message: error.message });
    }
};

const doesSubjectCodeExist = async (code) => {
     try {
        const count = await prisma.subject.count({ where: { code } });
        return count > 0;
    } catch (error) {
        console.log(error);
    }
};

const doesSubjectExist = async (id) => {
    try {
        const count = await prisma.subject.count({ where: { code } });
        return count > 0;
    } catch (error) {
        console.log(error);
    }
};

const isUserTeacher = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        return user?.role === TEACHER;
    } catch (error) {
        console.log(error);
    }
};