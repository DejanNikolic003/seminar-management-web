import * as service from "../services/enrollmentService.js";

const createEnrollment = async (req, res) => {
  try {
    const professorId = req.user.id;
    const { user_id, subject_id } = req.body;

    const enrollment = await service.enrollUserToSubject(
      Number(professorId),
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
    const { userId } = req.params;

    const enrollments = await service.getEnrollmentsByUser(Number(userId));

    return res.status(200).json({ enrollments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createEnrollment, getUserEnrollments };

