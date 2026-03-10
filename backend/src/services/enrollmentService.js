import { prisma } from "../config/prismaClient.js";
import { doesUserExistsById } from "./authService.js";

const enrollUserToSubject = async (professorId, userId, subjectId) => {
  try {
    const professor = await prisma.subjects.findFirst({
      where: {
        id: subjectId,
        professor_id: professorId,
      },
    });

    if (!professor)
      throw new Error(
        "Nemate dozvolu da upišete studente na ovaj predmet!"
      );

    const user = await doesUserExistsById(userId);
    if (!user) throw new Error("Korisnik ne postoji!");

    const alreadyEnrolled = await prisma.subject_enrollments.findUnique({
      where: {
        user_id_subject_id: {
          user_id: userId,
          subject_id: subjectId,
        },
      },
    });

    if (alreadyEnrolled)
      throw new Error("Korisnik je već upisan na ovaj predmet!");

    const enrollment = await prisma.subject_enrollments.create({
      data: {
        user_id: userId,
        subject_id: subjectId,
      },
    });

    return enrollment;
  } catch (error) {
    throw error;
  }
};

const getEnrollmentsByUser = async (userId) => {
  try {
    const enrollments = await prisma.subject_enrollments.findMany({
      where: { user_id: userId },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return enrollments;
  } catch (error) {
    throw error;
  }
};

export { enrollUserToSubject, getEnrollmentsByUser };

