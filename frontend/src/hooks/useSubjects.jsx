import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useSubjects = () => {
    const axiosPrivate = useAxiosPrivate();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const { data: response } = await axiosPrivate.get(`/enrollments`);
            const { data: subjectsResponse } = await axiosPrivate.get(`/subjects`);

            const subjectsMap = new Map();
            [...response.subjects, ...subjectsResponse.subjects].forEach(subject => {
                subjectsMap.set(subject.id, subject);
            });

            const subjects = Array.from(subjectsMap.values());

            setSubjects(subjects);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dohvatanja predmeta!";
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchSubject = async (id) => {
        try {
            const { data: response } = await axiosPrivate.get(`/subjects/${id}`);
            return response.subject;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dohvatanja predmeta!";
            throw new Error(message);
        }
    };

    const enrollStudentByEmail = async (subjectId, email) => {
        try {
            const { data: response } = await axiosPrivate.post("/enrollments", {
                subject_id: Number(subjectId),
                email: email.trim(),
            });

            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom upisa studenta na predmet!";
            throw new Error(message);
        }
    };

    return {
        subjects,
        loading,
        fetchSubjects,
        fetchSubject,
        enrollStudentByEmail,
    };
};

export default useSubjects;