import { prisma } from "../config/prismaClient.js";
import { doesUserExistsById } from "./authService.js";
import { ADMIN, PROFESSOR, STUDENT } from "../constants/roles.js";

const createTopic = async (name, description, subjectId, userId, role) => {
  try {
    const subject = await prisma.subjects.findUnique({
      where: { id: subjectId },
    });

    if (!subject) throw new Error("Predmet ne postoji!");
    if (role !== ADMIN && role !== PROFESSOR) {
      throw new Error("Nemate dozvolu da dodate temu!");
    }
    if (role === PROFESSOR && subject.professor_id !== userId) {
      throw new Error("Nemate dozvolu da dodate temu za ovaj predmet!");
    }

    const topic = await prisma.topics.create({
      data: {
        name,
        description,
        subject_id: subjectId,
      },
    });

    return topic;
  } catch (error) {
    throw error;
  }
};

const getAllTopics = async () => {
  try {
    const topics = await prisma.topics.findMany();
    return topics;
  } catch (error) {
    throw error;
  }
};

const getTopicsBySubject = async (subjectId) => {
  try {
    const topics = await prisma.topics.findMany({
      where: { subject_id: subjectId },
    });

    return topics;
  } catch (error) {
    throw error;
  }
};

const updateTopic = async (topicId, name, description, userId, role) => {
  try {
    const topic = await prisma.topics.findUnique({ where: { id: topicId } });
    if (!topic) throw new Error("Tema ne postoji!");

    const subject = await prisma.subjects.findUnique({
      where: { id: topic.subject_id },
    });
    if (!subject) throw new Error("Predmet ne postoji!");

    if (role !== ADMIN && role !== PROFESSOR) {
      throw new Error("Nemate dozvolu da izmenite temu!");
    }
    if (role === PROFESSOR && subject.professor_id !== userId) {
      throw new Error("Nemate dozvolu da izmenite temu za ovaj predmet!");
    }

    const updated = await prisma.topics.update({
      where: { id: topicId },
      data: {
        name,
        description,
      },
    });

    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteTopic = async (topicId, userId, role) => {
  try {
    const topic = await prisma.topics.findUnique({ where: { id: topicId } });
    if (!topic) throw new Error("Tema ne postoji!");

    const subject = await prisma.subjects.findUnique({
      where: { id: topic.subject_id },
    });
    if (!subject) throw new Error("Predmet ne postoji!");

    if (role !== ADMIN && role !== PROFESSOR) {
      throw new Error("Nemate dozvolu da obrišete temu!");
    }
    if (role === PROFESSOR && subject.professor_id !== userId) {
      throw new Error("Nemate dozvolu da obrišete temu za ovaj predmet!");
    }

    const activeSeminar = await prisma.seminars.findFirst({
      where: { topic_id: topicId },
    });
    if (activeSeminar) {
      throw new Error("Tema je već rezervisana i ne može biti obrisana!");
    }

    return prisma.topics.delete({ where: { id: topicId } });
  } catch (error) {
    throw error;
  }
};

const reserveTopic = async (topicId, userId, subjectId, role) => {
  try {
    if (role !== STUDENT) {
      throw new Error("Samo studenti mogu da rezervišu temu!");
    }

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
    if (topic.subject_id !== subjectId) {
      throw new Error("Tema ne pripada ovom predmetu!");
    }

    const occupiedTopic = await prisma.seminars.findFirst({
      where: {
        topic_id: topicId,
        subject_id: subjectId,
      },
    });

    if (occupiedTopic) {
      throw new Error("Tema je već zauzeta!");
    }

    const existingUserSeminarForSubject = await prisma.seminars.findFirst({
      where: {
        user_id: userId,
        subject_id: subjectId,
      },
    });

    if (existingUserSeminarForSubject) {
      throw new Error("Već ste rezervisali temu za ovaj predmet!");
    }

    const seminar = await prisma.seminars.create({
      data: {
        user_id: userId,
        subject_id: subjectId,
        topic_id: topicId,
        status: "DRAFT",
      },
    });

    return seminar;
  } catch (error) {
    throw error;
  }
};

export { createTopic, getAllTopics, getTopicsBySubject, updateTopic, deleteTopic, reserveTopic };

