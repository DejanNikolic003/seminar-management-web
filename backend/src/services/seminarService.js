import { prisma } from "../config/prismaClient.js";
import { doesUserExistsById, isProfessor } from "./authService.js";

const createSeminar = async (userId, subjectId, topicId, filePath) => {
  try {
    const user = await doesUserExistsById(userId);
    if (!user) throw new Error("Korisnik ne postoji!");

    const subject = await prisma.subjects.findUnique({
      where: { id: subjectId },
    });
    if (!subject) throw new Error("Predmet ne postoji!");

    const topic = await prisma.topics.findUnique({
      where: { id: topicId },
    });
    if (!topic) throw new Error("Tema ne postoji!");

    const seminar = await prisma.seminars.create({
      data: {
        user_id: userId,
        subject_id: subjectId,
        topic_id: topicId,
        file_path: filePath,
        status: "SUBMITTED",
      },
    });

    return seminar;
  } catch (error) {
    throw error;
  }
};

const getSeminarsBySubject = async (subjectId) => {
  try {
    const seminars = await prisma.seminars.findMany({
      where: { subject_id: subjectId },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        subject: {
          select: {
            name: true,
            code: true,
          },
        },
        topic: {
          select: {
            name: true,
          },
        },
      },
    });

    return seminars;
  } catch (error) {
    throw error;
  }
};

const updateSeminarStatus = async (seminarId, status, professorId) => {
  try {
    const professor = await doesUserExistsById(professorId);
    if (!professor) throw new Error("Korisnik ne postoji!");
    if (!isProfessor(professor)) throw new Error("Korisnik nije profesor!");

    const allowedStatuses = ["DRAFT", "SUBMITTED", "APPROVED", "DEFENDED"];
    if (!allowedStatuses.includes(status))
      throw new Error("Status nije validan!");

    const seminar = await prisma.seminars.update({
      where: { id: seminarId },
      data: { status },
    });

    return seminar;
  } catch (error) {
    throw error;
  }
};

export { createSeminar, getSeminarsBySubject, updateSeminarStatus };

