import * as service from "../services/enrollmentService.js";

const createEnrollment = async (req, res) => {
  try {
    const professorId = req.user.id;
    const role = req.user.role;
    const { user_id, email, subject_id } = req.body;

    if (!subject_id) {
      return res.status(400).json({ message: "Predmet je obavezan!" });
    }

    if (!email && !user_id) {
      return res.status(400).json({ message: "Prosledite email ili ID korisnika!" });
    }

    const enrollment = email
      ? await service.enrollUserToSubjectByEmail(
          Number(professorId),
          role,
          email.trim(),
          Number(subject_id)
        )
      : await service.enrollUserToSubject(
          Number(professorId),
          role,
          Number(user_id),
          Number(subject_id)
        );

    return res.status(200).json({
      message: "Uspešno ste upisali korisnika na predmet!",
      enrollment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    const { id } = req.user;
    const enrollments = await service.getEnrollmentsByUser(Number(id));
    const subjects = enrollments.map(enrollment => enrollment.subject);

    return res.status(200).json({ subjects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createEnrollment, getUserEnrollments };

