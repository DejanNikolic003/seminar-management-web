import { prisma } from "../config/prismaClient.js";
import { doesUserExistsById } from "./authService.js";
import { ADMIN, PROFESSOR, STUDENT } from "../constants/roles.js";

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

const getSeminarByTopic = async (topicId) => {
  try {
    const seminar = await prisma.seminars.findFirst({
      where: { topic_id: topicId },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        topic: {
          select: {
            id: true,
            name: true,
            description: true,
            subject_id: true,
          },
        },
      },
    });

    return seminar;
  } catch (error) {
    throw error;
  }
};

const uploadSeminarPaper = async (topicId, userId, role, filePath) => {
  try {
    if (role !== STUDENT) {
      throw new Error("Samo studenti mogu da postave seminarski rad!");
    }
    console.log(filePath);
    if (!filePath) {
      throw new Error("Fajl seminarskog rada je obavezan!");
    }

    const seminar = await prisma.seminars.findFirst({
      where: { topic_id: topicId, user_id: userId },
    });

    if (!seminar) {
      throw new Error("Niste rezervisali ovu temu!");
    }

    const updatedSeminar = await prisma.seminars.update({
      where: { id: seminar.id },
      data: {
        file_path: filePath,
        status: "SUBMITTED",
      },
    });

    return updatedSeminar;
  } catch (error) {
    throw error;
  }
};

const updateSeminarStatusByRole = async (seminarId, status, userId, role) => {
  try {
    if (![PROFESSOR, ADMIN].includes(role)) {
      throw new Error("Nemate dozvolu da menjate status seminara!");
    }

    const allowedStatuses = ["RESERVED", "SUBMITTED", "APPROVED", "DECLINED"];
    if (!allowedStatuses.includes(status)) {
      throw new Error("Status nije validan!");
    }

    const seminar = await prisma.seminars.findUnique({ where: { id: seminarId } });
    if (!seminar) throw new Error("Seminarski rad ne postoji!");

    if (role === PROFESSOR) {
      const subject = await prisma.subjects.findUnique({
        where: { id: seminar.subject_id },
      });
      if (!subject) throw new Error("Predmet ne postoji!");
      if (subject.professor_id !== userId) {
        throw new Error("Nemate dozvolu da menjate status za ovaj predmet!");
      }
    }

    return prisma.seminars.update({
      where: { id: seminarId },
      data: { status },
    });
  } catch (error) {
    throw error;
  }
};

export { createSeminar, getSeminarsBySubject, getSeminarByTopic, uploadSeminarPaper, updateSeminarStatusByRole };

