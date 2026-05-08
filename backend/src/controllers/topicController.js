import * as service from "../services/topicService.js";

const createTopic = async (req, res) => {
  try {
    const { name, description, subject_id } = req.body;
    const userId = Number(req.user.id);
    const role = req.user.role;

    const topic = await service.createTopic(
      name,
      description,
      Number(subject_id),
      userId,
      role
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
    const { subject_id } = req.body;
    const userId = Number(req.user.id);
    const role = req.user.role;

    const seminar = await service.reserveTopic(
      Number(id),
      userId,
      Number(subject_id),
      role
    );

    return res.status(200).json({
      message: "Uspešno ste rezervisali temu!",
      seminar,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = Number(req.user.id);
    const role = req.user.role;

    const topic = await service.updateTopic(
      Number(id),
      name,
      description,
      userId,
      role
    );

    return res.status(200).json({
      message: "Uspešno ste izmenili temu!",
      topic,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(req.user.id);
    const role = req.user.role;

    const topic = await service.deleteTopic(Number(id), userId, role);

    return res.status(200).json({
      message: "Uspešno ste obrisali temu!",
      topic,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createTopic, getAllTopics, getTopicsBySubject, reserveTopic, updateTopic, deleteTopic };

