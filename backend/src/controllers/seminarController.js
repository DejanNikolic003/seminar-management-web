import * as service from "../services/seminarService.js";

const createSeminar = async (req, res) => {
  try {
    const { user_id, subject_id, topic_id, file_path } = req.body;

    const seminar = await service.createSeminar(
      Number(user_id),
      Number(subject_id),
      Number(topic_id),
      file_path
    );

    return res.status(200).json({
      message: "Uspešno ste kreirali seminar!",
      seminar,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSeminars = async (req, res) => {
  try {
    const { subject_id } = req.query;

    if (!subject_id)
      return res
        .status(400)
        .json({ message: "Parametar subject_id je obavezan!" });

    const seminars = await service.getSeminarsBySubject(Number(subject_id));

    return res.status(200).json({ seminars });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSeminarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const professorId = req.user.id;

    const seminar = await service.updateSeminarStatus(
      Number(id),
      status,
      Number(professorId)
    );

    return res.status(200).json({
      message: "Uspešno ste izmenili status seminara!",
      seminar,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createSeminar, getSeminars, updateSeminarStatus };

