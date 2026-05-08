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

const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await service.getSubjectById(Number(id));
        if (!subject) return res.status(404).json({ message: "Predmet nije pronađen!" });
        
        const mappedSubject = {
            id: subject.id,
            name: subject.name,
            code: subject.code,
            professor: {
                first_name: subject.professor.first_name,
                last_name: subject.professor.last_name
            }
        };
        return res.status(200).json({ subject: mappedSubject });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }  
};

export { createSubject, getAllSubjects, getSubjectById };