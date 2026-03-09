import { prisma } from "../config/prismaClient.js";
import { doesUserExistsById } from "./authService.js";

const createTopic = async (name, description, subjectId) => {
  try {
    const subject = await prisma.subjects.findUnique({
      where: { id: subjectId },
    });

    if (!subject) throw new Error("Predmet ne postoji!");

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

const reserveTopic = async (topicId, userId, subjectId) => {
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

    const existingSeminar = await prisma.seminars.findFirst({
      where: {
        user_id: userId,
        subject_id: subjectId,
        topic_id: topicId,
      },
    });

    if (existingSeminar) {
      throw new Error("Ovaj korisnik je već rezervisao ovu temu za ovaj predmet!");
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

export { createTopic, getAllTopics, getTopicsBySubject, reserveTopic };

