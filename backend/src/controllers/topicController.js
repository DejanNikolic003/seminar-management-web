import * as service from "../services/topicService.js";

const createTopic = async (req, res) => {
  try {
    const { name, description, subject_id } = req.body;

    const topic = await service.createTopic(
      name,
      description,
      Number(subject_id)
    );

    return res
      .status(200)
      .json({ message: "Uspešno ste dodali novu temu!", topic });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllTopics = async (req, res) => {
  try {
    const topics = await service.getAllTopics();

    return res.status(200).json({ topics });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTopicsBySubject = async (req, res) => {
  try {
    const { id } = req.params;

    const topics = await service.getTopicsBySubject(Number(id));

    return res.status(200).json({ topics });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const reserveTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, subject_id } = req.body;

    const seminar = await service.reserveTopic(
      Number(id),
      Number(user_id),
      Number(subject_id)
    );

    return res.status(200).json({
      message: "Uspešno ste rezervisali temu!",
      seminar,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createTopic, getAllTopics, getTopicsBySubject, reserveTopic };

