import { prisma } from "../config/prismaClient.js";
import { doesUserExistsById, isProfessor } from "./authService.js";

const createSubject = async (name, code, professorId) => {
  try {
    const user = await doesUserExistsById(professorId);

    if (!user) throw new Error("Korisnik ne postoji!");
    if (!isProfessor(user)) throw new Error("Korisnik nije profesor!");
    if(await doesSubjectExists(name, code)) throw new Error("Predmet već postoji sa ovim nazivom ili kodom!");

    const data = { name, code, professor_id: professorId };
    const subject = await prisma.subjects.create({ data });

    return subject;
  } catch (error) {
    throw error;
  } 
};

const getAllSubjects = async () => {
    try {
        const subjects = await prisma.subjects.findMany({
            include: {
                professor: {
                    select: {
                        first_name: true,
                        last_name: true
                    }
                }
            }
        });

        return subjects;
    } catch (error) {
        throw error;
    }
};

const doesSubjectExists = async (name, code) => {
    try {
        const subject = await prisma.subjects.findFirst({ where: { OR: [ { name }, { code } ] } });
        return !!subject;
    } catch (error) {
        throw error;
    }
};

export { createSubject, getAllSubjects };