import { prisma } from "../config/prismaClient.js";
import { doesUserExistsById, getUserByEmail } from "./authService.js";
import { ADMIN, PROFESSOR, STUDENT } from "../constants/roles.js";

const enrollUserToSubject = async (professorId, role, userId, subjectId) => {
  try {
    const subject = await prisma.subjects.findUnique({ where: { id: subjectId } });

    if (!subject) {
      throw new Error("Predmet ne postoji!");
    }

    if (role === PROFESSOR && subject.professor_id !== professorId)
      throw new Error(
        "Nemate dozvolu da upišete studente na ovaj predmet!"
      );

    if (role !== PROFESSOR && role !== ADMIN) {
      throw new Error("Nemate dozvolu da upišete studente na predmet!");
    }

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

const enrollUserToSubjectByEmail = async (professorId, role, email, subjectId) => {
  try {
    const user = await getUserByEmail(email);

    if (user.role !== STUDENT) {
      throw new Error("Na predmet je moguće upisati samo studenta!");
    }

    return enrollUserToSubject(professorId, role, user.id, subjectId);
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
            professor: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });

    return enrollments;
  } catch (error) {
    throw error;
  }
};

export { enrollUserToSubject, enrollUserToSubjectByEmail, getEnrollmentsByUser };

