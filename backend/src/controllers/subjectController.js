import * as service from "../services/subjectService.js";

const createSubject = async (req, res) => {
    try {
        const { name, code, professor_id } = req.body;

        const subject = await service.createSubject(name, code, professor_id);

        return res.status(200).json({ message: "Uspešno ste dodali novi predmet!", subject });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await service.getAllSubjects();

        const mappedSubjects = subjects.map(subject => ({
            id: subject.id,
            name: subject.name,
            code: subject.code,
            professor: `${subject.professor.first_name} ${subject.professor.last_name}`
        }));

        return res.status(200).json({ subjects: mappedSubjects });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { createSubject, getAllSubjects };