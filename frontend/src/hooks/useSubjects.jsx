import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useSubjects = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const { data: response } = await axiosPrivate.get(`/enrollments`);
            console.log(response.subjects);
            setSubjects(response.subjects);
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

    const fetchTopicsBySubject = async (subjectId) => {
        try {
            const { data: response } = await axiosPrivate.get(`/topics/subject/${subjectId}`);
            return response.topics;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dohvatanja tema!";
            throw new Error(message);
        }
    };

    const createTopic = async (subjectId, name, description) => {
        try {
            const { data: response } = await axiosPrivate.post("/topics", {
                subject_id: Number(subjectId),
                name,
                description,
            });

            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dodavanja teme!";
            throw new Error(message);
        }
    };

    const updateTopic = async (topicId, name, description) => {
        try {
            const { data: response } = await axiosPrivate.put(`/topics/${topicId}`, {
                name,
                description,
            });

            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom izmene teme!";
            throw new Error(message);
        }
    };

    const deleteTopic = async (topicId) => {
        try {
            const { data: response } = await axiosPrivate.delete(`/topics/${topicId}`);
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom brisanja teme!";
            throw new Error(message);
        }
    };

    const reserveTopic = async (topicId, subjectId) => {
        try {
            const { data: response } = await axiosPrivate.post(`/topics/${topicId}/reserve`, {
                subject_id: Number(subjectId),
            });
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom rezervacije teme!";
            throw new Error(message);
        }
    };

    const fetchSeminarsBySubject = async (subjectId) => {
        try {
            const { data: response } = await axiosPrivate.get(`/seminars?subject_id=${subjectId}`);
            return response.seminars;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Došlo je do greške prilikom dohvatanja rezervacija!";
            throw new Error(message);
        }
    };

    return {
        subjects,
        loading,
        fetchSubjects,
        fetchSubject,
        enrollStudentByEmail,
        fetchTopicsBySubject,
        createTopic,
        updateTopic,
        deleteTopic,
        reserveTopic,
        fetchSeminarsBySubject,
    };
};

export default useSubjects;